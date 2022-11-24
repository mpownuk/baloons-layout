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
function renderCalendar(month, year) {
    yearMonth.textContent = '';
    root.textContent = '';
    let newDate = new Date(year, month, 1);
    let daysOfMonth = [];
    function appendEmptyField() {
        const emptyField = document.createElement('span');
        emptyField.className = 'empty--field';
        emptyField.textContent = '';
        root.appendChild(emptyField);
    }
    for (let i = 0; i < new Date(year, month).getDay() - 1; i++) {
        appendEmptyField();
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
        dayNumber.textContent = '';
        dayNumber.textContent = `${index + 1} ${daysOfWeek[day.getDay()]}`;
        root.appendChild(dayNumber);
    });
    for (let i = (new Date(newDate.getFullYear(), newDate.getMonth(), 0).getDate()) + 1; i <= 42; i++) {
        appendEmptyField();
        console.log(month, i);
    }
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
