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
    for (let i = 0; i < new Date(year, month).getDay(); i++) {
        const emptyField = document.createElement('span');
        emptyField.textContent = '';
        root.appendChild(emptyField);
    }
    while (newDate.getMonth() === month) {
        daysOfMonth.push(new Date(newDate));
        newDate.setDate(newDate.getDate() + 1);
    }
    daysOfMonth.forEach((day, index) => {
        const dayNumber = document.createElement('span');
        dayNumber.textContent = '';
        dayNumber.textContent = `${index + 1} ${daysOfWeek[day.getDay()]}`;
        root.appendChild(dayNumber);
        console.log(day);
    });
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
