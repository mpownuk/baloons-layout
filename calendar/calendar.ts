const calendarRoot = document.getElementById("calendar--root") as HTMLElement;
const calendarRoot1 = document.getElementById("calendar--root1") as HTMLElement;

const formRoot = document.getElementById("form--root") as HTMLElement;
const yearMonth = document.getElementById("year--month") as HTMLElement;
const backward = document.getElementById("backward") as HTMLButtonElement;
const forward = document.getElementById("forward") as HTMLButtonElement;
const closeBtn = document.getElementById("close--form--btn") as HTMLElement;
const chosenMonthYear = document.createElement("span") as HTMLSpanElement;
const bookingForm = document.getElementById("booking--form") as HTMLFormElement;

const monthsOfYear: string[] = [
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

const currentDay: number = new Date().getDate()
const currentMonth: number = new Date().getMonth();
const currentYear: number = new Date().getFullYear();
let monthCounter: number = currentMonth;
let yearCounter: number = currentYear;

function appendEmptyField(root:HTMLElement) {
  const emptyField: HTMLSpanElement = document.createElement("span");
  emptyField.className = "empty--field";
  emptyField.textContent = "";
  root.appendChild(emptyField);
}

function renderCalendar(month: number, year: number, root:HTMLElement) {
  yearMonth.textContent = "";
  root.textContent = "";
  let newDate = new Date(year, month, 1);
  let daysOfMonth: Date[] = [];

  for (let i = 0; i < new Date(year, month).getDay() - 1; i++) {
    appendEmptyField(root);
  }

  while (newDate.getMonth() === month) {
    daysOfMonth.push(new Date(newDate));
    newDate.setDate(newDate.getDate() + 1);
  }

  daysOfMonth.forEach((day: Date, index: number) => {
    const dayNumber: HTMLSpanElement = document.createElement("span");
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
    if ((day.getDay() > 0 && day.getDay() < 6) && (
      Date.parse(`${currentYear} ${currentMonth+1} ${currentDay}`) <=
      Date.parse(`${day.getFullYear()} ${day.getMonth()+1} ${day.getDate()}`) 
    ))  {
        dayNumber.classList.add("calendar--free--term");
        dayNumber.addEventListener("click", () => {
        formRoot.classList.add("visible");
        console.log(Date.parse(`${day.getFullYear()} ${day.getMonth()+1} ${day.getDate()}`), Date.parse(`${currentYear} ${currentMonth+1} ${currentDay}`))
      });
    }
    dayNumber.textContent = "";
    dayNumber.textContent = `${index + 1}`;
    root.appendChild(dayNumber);
  });

  for (
    let i = new Date(newDate.getFullYear(), newDate.getMonth(), 0).getDate();
    i <= 42;
    i++
  ) {
    appendEmptyField(root);
  }

  function hideExtraEptyFields() {
    const hideMe: NodeListOf<HTMLSpanElement> =
      document.querySelectorAll("span");
    function loopOnEmptyFilds(empty: number) {
      for (let i = empty; i < hideMe.length; i++) {
        hideMe[i].style.display = "none";
      }
    }
    if (hideMe[28].className === "empty--field") {
      loopOnEmptyFilds(28);
    } else if (hideMe[35].className === "empty--field") {
      loopOnEmptyFilds(35);
    }
  }

  hideExtraEptyFields();
}
renderCalendar(monthCounter, yearCounter, calendarRoot);

function setMonth() {
  chosenMonthYear.textContent = "";
  chosenMonthYear.textContent = `${yearCounter.toString()}, ${
    monthsOfYear[monthCounter]
  }`;
  yearMonth.appendChild(chosenMonthYear);
}
setMonth();

function setCalendarRootPosition(root:HTMLElement, style:string){
  if(root.textContent === ""){
    root.style.left = style
  }
}
function manipulateRootsPosition(emptyRoot:HTMLElement, fullfilledRoot:HTMLElement,fRpos1:string, fRpos2:string){
  if(emptyRoot.textContent === ""){
    renderCalendar(monthCounter, yearCounter, emptyRoot);
    yearMonth.appendChild(chosenMonthYear);
    emptyRoot.style.left = "0"
    emptyRoot.style.transition = '0.2s'

    fullfilledRoot.style.left = fRpos1
    fullfilledRoot.style.transition = '0.2s'
    setTimeout(() => {
      fullfilledRoot.textContent = ""
      fullfilledRoot.style.left = fRpos2  
    }, 100);
    setTimeout(() => {
      backward.disabled = false
      forward.disabled = false  
    }, 300);
  }
}

backward.addEventListener('mouseenter', ()=>{
  setCalendarRootPosition(calendarRoot1, "-100%")
  setCalendarRootPosition(calendarRoot, "-100%")
})

forward.addEventListener('mouseenter', ()=>{
  setCalendarRootPosition(calendarRoot1, "200%")
  setCalendarRootPosition(calendarRoot, "200%")
})

backward.addEventListener("click", (I) => {
  monthCounter <= 0
    ? (monthCounter = 11) && (yearCounter -= 1)
    : (monthCounter -= 1);
  setMonth();
  backward.disabled = true
  forward.disabled = true
 
  manipulateRootsPosition(calendarRoot1,calendarRoot,'200%', '-100%')
  manipulateRootsPosition(calendarRoot,calendarRoot1,'200%', '-100%')
  const d = Date.parse( new Date().toString())
  console.log(d)
});

forward.addEventListener("click", (I) => {
  monthCounter >= 11
  ? (yearCounter += 1) && (monthCounter = 0)
  : (monthCounter += 1);
  setMonth();
  backward.disabled = true
  forward.disabled = true 

  manipulateRootsPosition(calendarRoot1,calendarRoot,'-100%','200%')
  manipulateRootsPosition(calendarRoot,calendarRoot1,'-100%','200%')
  const d = Date.parse( new Date().toString())
  console.log(d)
});

bookingForm.addEventListener("click", (e) => {
  e.preventDefault();
});
closeBtn.addEventListener("click", () => {
  formRoot.classList.remove("visible");
});
