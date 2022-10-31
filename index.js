const openNav = document.querySelector(".open--nav");
const closeNav = document.querySelector(".close--nav");
const navMenu = document.querySelector(".nav--menu");
const navImgBox = document.querySelector(".nav--img--box");
const navImg = document.querySelector(".nav--img");

const calendar = document.querySelector(".calendar");

const mediaWidth = window.matchMedia("(min-width: 37em)");

let scrolled;

function displayNav() {
  navMenu.style.top = "0";
  openNav.style.display = "none";
  closeNav.style.display = "inline-block";
}

function hideNav() {
  navMenu.style.top = "-100%";
  closeNav.style.display = "none";
  openNav.style.display = "inline-block";
}

function matchMediaWidth() {
  if (mediaWidth.matches) {
    navMenu.style.top = "0";
  } else {
    closeNav.style.display = "none";
    openNav.style.display = "inline-block";
    navMenu.style.top = "-100%";
  }
}

mediaWidth.addListener(matchMediaWidth); // <================================== TUTAJ

function parallax() {
  scrolled = window.scrollY;
  // calendar.style.transform = `translateY(${scrolled}px)`;
  navImgBox.style.transform = `translateY(${scrolled}px)`;
  navImg.style.transform = `translate(50%, ${scrolled * -0.25}px)`;
  // console.log(scrolled);
}

openNav.addEventListener("click", displayNav);
closeNav.addEventListener("click", hideNav);
window.addEventListener("scroll", parallax);

//======paralax cd=======//

const testEl = document.getElementById("testEl");
var bodyRect = document.body.getBoundingClientRect(),
  elemRect = testEl.getBoundingClientRect(),
  offset = elemRect.top - bodyRect.top;

console.log("Element is " + offset + " vertical pixels from <body>");

window.addEventListener("scroll", () => {
  pos = window.scrollY;
  let viewportHeight = window.innerHeight;
  // console.log(pos + viewportHeight);
  // console.log(Math.floor(testEl.getBoundingClientRect().y));
  if (Math.floor(testEl.getBoundingClientRect().y) - viewportHeight <= 0) {
    testEl.style.transform = `translateY(${
      testEl.getBoundingClientRect().y * -0.25
    }px)`;
  }
});
