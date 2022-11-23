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

 for (let i = 0; i < new Date(year, month).getDay(); i++){
  const emptyField: HTMLSpanElement = document.createElement('span')
  emptyField.textContent = ''
  root.appendChild(emptyField)
 }

 while(newDate.getMonth() === month){
  daysOfMonth.push(new Date(newDate))
  newDate.setDate(newDate.getDate()+1)
 }

 daysOfMonth.forEach((day, index) => {
  const dayNumber: HTMLSpanElement = document.createElement('span')
  dayNumber.textContent = ''
  dayNumber.textContent = `${index+1} ${daysOfWeek[day.getDay()]}`
  root.appendChild(dayNumber)
  console.log(day)
 })
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