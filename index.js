const openNav = document.querySelector(".open--nav");
const closeNav = document.querySelector(".close--nav");
const navMenu = document.querySelector(".nav--menu");

const mediaWidth = window.matchMedia("(min-width: 600px)");

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

openNav.addEventListener("click", displayNav);
closeNav.addEventListener("click", hideNav);