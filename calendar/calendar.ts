const calendarRoot = document.getElementById("calendar--root") as HTMLElement

const formRoot = document.getElementById('form--root') as HTMLElement
const yearMonth = document.getElementById("year--month") as HTMLElement
const backward = document.getElementById("backward") as HTMLButtonElement
const forward = document.getElementById("forward") as HTMLButtonElement
const closeBtn = document.getElementById('close--form--btn') as HTMLElement
const elem  = document.createElement('span') as HTMLSpanElement
const bookingForm = document.getElementById("booking--form") as HTMLFormElement

closeBtn.addEventListener('click', ()=>{formRoot.classList.remove('visible')})


const monthsOfYear: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const daysOfWeek: string[] = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']

const currentMonth: number = new Date().getMonth()
const currentYear: number = new Date().getFullYear()
let monthCounter: number = currentMonth
let yearCounter: number = currentYear

function appendEmptyField(){ 
  const emptyField: HTMLSpanElement = document.createElement('span')
  emptyField.className = 'empty--field'
  emptyField.textContent = ''
  calendarRoot.appendChild(emptyField)
}

function renderCalendar(month:number, year:number){
  yearMonth.textContent = ''
  calendarRoot.textContent = ''
  let newDate = new Date(year, month, 1)
  let daysOfMonth: Date[] = []
  
  
  // writing function to count empty fields before actual days is waste of time (sundays are stupid) bcs at the end last grid rows fullfilled with gray background will be not displayed
  //  let emptyFieldsBeforeActualDays:number = 0
  
  
  for (let i = 0; i < new Date(year, month).getDay()-1; i++){
    appendEmptyField()
    // emptyFieldsBeforeActualDays = i
  }
  
  while(newDate.getMonth() === month){
    daysOfMonth.push(new Date(newDate))
    newDate.setDate(newDate.getDate()+1)
  }
  
  daysOfMonth.forEach((day: Date, index: number) => {
    const dayNumber: HTMLSpanElement = document.createElement('span')
    dayNumber.className = 'calendar--day'
  if((day.getDay() === 0) && (index === 0)){
    for(let i = 0; i<6;i++){
      appendEmptyField()
    }
  }
  if(day.getDay() === 0){
    dayNumber.style.color =  'red'
    dayNumber.style.gridColumn = '7'
  }
  if(day.getDay()>0 && day.getDay()<6){
    dayNumber.classList.add("calendar--free--term")
    dayNumber.addEventListener('click', ()=>{
      formRoot.classList.add("visible")
    })
  }
  dayNumber.textContent = ''
  dayNumber.textContent = `${index+1} ${daysOfWeek[day.getDay()]}`
  calendarRoot.appendChild(dayNumber)
})

for (let i = (new Date(newDate.getFullYear(), newDate.getMonth(), 0).getDate()); i <= 42; i++){
  appendEmptyField()
  console.log(i)
}

function hideExtraEptyFields(){
  const hideMe: NodeListOf <HTMLSpanElement> = document.querySelectorAll("span")
  function loopOnEmptyFilds(empty: number){ 
    for (let i = empty; i < hideMe.length; i++){
    hideMe[i].style.display = 'none'
  }
}
if (hideMe[28].className === 'empty--field'){
  loopOnEmptyFilds(28)
} else if (hideMe[35].className === 'empty--field'){
  loopOnEmptyFilds(35)
}
}

hideExtraEptyFields()
}
renderCalendar(monthCounter, yearCounter)


function setMonth() {
  elem.textContent = ""
  elem.textContent = `${yearCounter.toString()}, ${monthsOfYear[monthCounter]}`
  yearMonth.appendChild(elem)
}
setMonth()

backward.addEventListener('click', (I)=>{
  monthCounter <= 0 ? (monthCounter = 11) && (yearCounter -=1): monthCounter-= 1
  setMonth()
  renderCalendar(monthCounter, yearCounter)
  yearMonth.appendChild(elem)
  
})

forward.addEventListener('click', (I)=>{
  monthCounter >= 11 ? (yearCounter +=1) && (monthCounter = 0) : monthCounter += 1
  setMonth()
  renderCalendar(monthCounter, yearCounter)
  yearMonth.appendChild(elem)
})


bookingForm.addEventListener('click', (e)=>{
  e.preventDefault()
})