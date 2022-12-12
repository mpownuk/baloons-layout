"use strict";
const calendarRoot = document.getElementById("calendar--root");
const calendarRoot1 = document.getElementById("calendar--root1");
const formRoot = document.getElementById("form--root");
const yearMonth = document.getElementById("year--month");
const backward = document.getElementById("backward");
const forward = document.getElementById("forward");
const closeBtn = document.getElementById("close--form--btn");
const chosenMonthYear = document.createElement("span");
const bookingForm = document.getElementById("booking--form");
const monthsOfYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];
const currentDay = new Date().getDate();
const currentMonth = new Date().getMonth();
const currentYear = new Date().getFullYear();
let monthCounter = currentMonth;
let yearCounter = currentYear;
function appendEmptyField(root) {
    const emptyField = document.createElement("span");
    emptyField.className = "empty--field";
    emptyField.textContent = "";
    root.appendChild(emptyField);
}
function renderCalendar(month, year, root) {
    yearMonth.textContent = "";
    root.textContent = "";
    let newDate = new Date(year, month, 1);
    let daysOfMonth = [];
    for (let i = 0; i < new Date(year, month).getDay() - 1; i++) {
        appendEmptyField(root);
    }
    while (newDate.getMonth() === month) {
        daysOfMonth.push(new Date(newDate));
        newDate.setDate(newDate.getDate() + 1);
    }
    daysOfMonth.forEach((day, index) => {
        const dayNumber = document.createElement("span");
        dayNumber.className = "calendar--day";
        if (day.getDay() === 0 && index === 0) {
            for (let i = 0; i < 6; i++) {
                appendEmptyField(root);
            }
        }
        if (day.getDay() === 0) {
            dayNumber.style.color = "red";
            dayNumber.style.gridColumn = "7";
        }
        if ((day.getDay() > 0 && day.getDay() < 6) && (Date.parse(`${currentYear} ${currentMonth + 1} ${currentDay}`) <=
            Date.parse(`${day.getFullYear()} ${day.getMonth() + 1} ${day.getDate()}`))) {
            dayNumber.classList.add("calendar--free--term");
            dayNumber.addEventListener("click", () => {
                formRoot.classList.add("visible");
                console.log(Date.parse(`${day.getFullYear()} ${day.getMonth() + 1} ${day.getDate()}`), Date.parse(`${currentYear} ${currentMonth + 1} ${currentDay}`));
            });
        }
        dayNumber.textContent = "";
        dayNumber.textContent = `${index + 1}`;
        root.appendChild(dayNumber);
    });
    for (let i = new Date(newDate.getFullYear(), newDate.getMonth(), 0).getDate(); i <= 42; i++) {
        appendEmptyField(root);
        console.log(i);
    }
    function hideExtraEptyFields() {
        const hideMe = document.querySelectorAll("span");
        function loopOnEmptyFilds(empty) {
            for (let i = empty; i < hideMe.length; i++) {
                hideMe[i].style.display = "none";
            }
        }
        if (hideMe[28].className === "empty--field") {
            loopOnEmptyFilds(28);
        }
        else if (hideMe[35].className === "empty--field") {
            loopOnEmptyFilds(35);
        }
    }
    hideExtraEptyFields();
}
renderCalendar(monthCounter, yearCounter, calendarRoot);
function setMonth() {
    chosenMonthYear.textContent = "";
    chosenMonthYear.textContent = `${yearCounter.toString()}, ${monthsOfYear[monthCounter]}`;
    yearMonth.appendChild(chosenMonthYear);
}
setMonth();
function setCalendarRootPosition(root, style) {
    if (root.textContent === "") {
        root.style.left = style;
    }
}
function manipulateRootsPosition(emptyRoot, fullfilledRoot, fRpos1, fRpos2) {
    if (emptyRoot.textContent === "") {
        renderCalendar(monthCounter, yearCounter, emptyRoot);
        yearMonth.appendChild(chosenMonthYear);
        emptyRoot.style.left = "0";
        emptyRoot.style.transition = '0.3s';
        fullfilledRoot.style.left = fRpos1;
        fullfilledRoot.style.transition = '0.3s';
        setTimeout(() => {
            fullfilledRoot.textContent = "";
            fullfilledRoot.style.left = fRpos2;
        }, 300);
        setTimeout(() => {
            backward.disabled = false;
            forward.disabled = false;
        }, 400);
    }
}
backward.addEventListener('mouseenter', () => {
    setCalendarRootPosition(calendarRoot1, "-100%");
    setCalendarRootPosition(calendarRoot, "-100%");
});
forward.addEventListener('mouseenter', () => {
    setCalendarRootPosition(calendarRoot1, "200%");
    setCalendarRootPosition(calendarRoot, "200%");
});
backward.addEventListener("click", (I) => {
    monthCounter <= 0
        ? (monthCounter = 11) && (yearCounter -= 1)
        : (monthCounter -= 1);
    setMonth();
    backward.disabled = true;
    forward.disabled = true;
    manipulateRootsPosition(calendarRoot1, calendarRoot, '200%', '-100%');
    manipulateRootsPosition(calendarRoot, calendarRoot1, '200%', '-100%');
});
forward.addEventListener("click", (I) => {
    monthCounter >= 11
        ? (yearCounter += 1) && (monthCounter = 0)
        : (monthCounter += 1);
    setMonth();
    backward.disabled = true;
    forward.disabled = true;
    manipulateRootsPosition(calendarRoot1, calendarRoot, '-100%', '200%');
    manipulateRootsPosition(calendarRoot, calendarRoot1, '-100%', '200%');
});
bookingForm.addEventListener("click", (e) => {
    e.preventDefault();
});
closeBtn.addEventListener("click", () => {
    formRoot.classList.remove("visible");
});
