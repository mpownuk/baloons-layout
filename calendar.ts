const root = document.querySelector("#root") as HTMLElement
const yearMonth = document.querySelector("#year-month") as HTMLElement
const backward = document.querySelector("#backward") as HTMLButtonElement
const forward = document.querySelector("#forward") as HTMLButtonElement

const elem: HTMLSpanElement  = document.createElement('span')

const monthsOfYear: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const daysOfWeek: string[] = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']

const currentMonth: number = new Date().getMonth()
const currentYear: number = new Date().getFullYear()
let monthCounter: number = currentMonth
let yearCounter: number = currentYear

function renderCalendar(month:number, year:number){
  yearMonth.textContent = ''
  root.textContent = ''
 let newDate = new Date(year, month, 1)
 let daysOfMonth: Date[] = []

 function appendEmptyField(){ 
   const emptyField: HTMLSpanElement = document.createElement('span')
   emptyField.className = 'empty--field'
   emptyField.textContent = ''
  
  root.appendChild(emptyField)
}

 for (let i = 0; i < new Date(year, month).getDay()-1; i++){
  appendEmptyField()
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
  dayNumber.textContent = ''
  dayNumber.textContent = `${index+1} ${daysOfWeek[day.getDay()]}`
  root.appendChild(dayNumber)
 })

 for (let i = (new Date(newDate.getFullYear(), newDate.getMonth(), 0).getDate())+1; i <= 42; i++){
  appendEmptyField()
  console.log(month, i)
 }
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