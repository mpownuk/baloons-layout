"use strict";
const root = document.querySelector("#root");
const yearMonth = document.querySelector("#year-month");
const backward = document.querySelector("#backward");
const forward = document.querySelector("#forward");
const elem = document.createElement('span');
const monthsOfYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const daysOfWeek = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
const currentMonth = new Date().getMonth();
const currentYear = new Date().getFullYear();
let monthCounter = currentMonth;
let yearCounter = currentYear;
function appendEmptyField() {
    const emptyField = document.createElement('span');
    emptyField.className = 'empty--field';
    emptyField.textContent = '';
    root.appendChild(emptyField);
}
function renderCalendar(month, year) {
    yearMonth.textContent = '';
    root.textContent = '';
    let newDate = new Date(year, month, 1);
    let daysOfMonth = [];
    function removeForm() {
    }
    function generateForm(parent) {
        const form = document.createElement('div');
        form.innerHTML = `<form>
  <label for="firstName"> First Name</label>
  <input type="text" id="firstName" placeholder="First Name">
  <label for="lastName"> Last Name</label>
  <input type="email" id="email" placeholder="Email">
  <label for="firstName">Adress</label>
  <input type="text" id="city" placeholder="City">
  <input type="text" id="street" placeholder="Street">
  <input type="number" id="homeNumber" placeholder="22">
  <textarea placeholder="Additional Information"></textarea>
</form>`;
        parent.appendChild(form);
    }
    // writing function to count empty fields before actual days is waste of time (sundays are stupid) bcs at the end last grid rows fullfilled with gray background will be not displayed
    //  let emptyFieldsBeforeActualDays:number = 0
    for (let i = 0; i < new Date(year, month).getDay() - 1; i++) {
        appendEmptyField();
        // emptyFieldsBeforeActualDays = i
    }
    while (newDate.getMonth() === month) {
        daysOfMonth.push(new Date(newDate));
        newDate.setDate(newDate.getDate() + 1);
    }
    daysOfMonth.forEach((day, index) => {
        const dayNumber = document.createElement('span');
        dayNumber.className = 'calendar--day';
        if ((day.getDay() === 0) && (index === 0)) {
            for (let i = 0; i < 6; i++) {
                appendEmptyField();
            }
        }
        if (day.getDay() === 0) {
            dayNumber.style.color = 'red';
            dayNumber.style.gridColumn = '7';
        }
        if (day.getDay() > 0 && day.getDay() < 6) {
            dayNumber.classList.add("calendar--free--term");
            dayNumber.addEventListener('click', () => {
                removeForm();
                generateForm(dayNumber);
            });
        }
        dayNumber.textContent = '';
        dayNumber.textContent = `${index + 1} ${daysOfWeek[day.getDay()]}`;
        root.appendChild(dayNumber);
    });
    for (let i = (new Date(newDate.getFullYear(), newDate.getMonth(), 0).getDate()); i <= 42; i++) {
        appendEmptyField();
        console.log(i);
    }
    function hideExtraEptyFields() {
        const hideMe = document.querySelectorAll("span");
        function loopOnEmptyFilds(empty) {
            for (let i = empty; i < hideMe.length; i++) {
                hideMe[i].style.display = 'none';
            }
        }
        if (hideMe[28].className === 'empty--field') {
            loopOnEmptyFilds(28);
        }
        else if (hideMe[35].className === 'empty--field') {
            loopOnEmptyFilds(35);
        }
        // console.log(hideMe)
    }
    hideExtraEptyFields();
}
renderCalendar(monthCounter, yearCounter);
function setMonth() {
    elem.textContent = "";
    elem.textContent = `${yearCounter.toString()}, ${monthsOfYear[monthCounter]}`;
    yearMonth.appendChild(elem);
}
setMonth();
backward.addEventListener('click', (I) => {
    monthCounter <= 0 ? (monthCounter = 11) && (yearCounter -= 1) : monthCounter -= 1;
    setMonth();
    renderCalendar(monthCounter, yearCounter);
    yearMonth.appendChild(elem);
});
forward.addEventListener('click', (I) => {
    monthCounter >= 11 ? (yearCounter += 1) && (monthCounter = 0) : monthCounter += 1;
    setMonth();
    renderCalendar(monthCounter, yearCounter);
    yearMonth.appendChild(elem);
});
