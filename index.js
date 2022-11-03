const paralaxEl = document.querySelectorAll(".paralaxEl");
const openNav = document.querySelector(".open--nav");
const closeNav = document.querySelector(".close--nav");
const navMenu = document.querySelector(".nav--menu");

const mediaWidth = window.matchMedia("(min-width: 37em)");

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
  mediaWidth.matches
    ? (navMenu.style.top = "0")
    : (closeNav.style.display = "none") &&
      (openNav.style.display = "inline-block") &&
      (navMenu.style.top = "-100%");
}

mediaWidth.addListener(matchMediaWidth); // <================================== TUTAJ

function paralax() {
  let viewportHeight = window.innerHeight;
  paralaxEl.forEach((paralaxElem) => {
    let check = paralaxElem.getBoundingClientRect().y * -0.5;

    if (
      Math.floor(paralaxElem.getBoundingClientRect().y) - viewportHeight <=
      0
    ) {
      paralaxElem.style.transform = `translate(50%,${
        paralaxElem.getBoundingClientRect().y * -0.5
      }px)`;
      console.log(paralaxElem.alt + " " + check);
    }
  });
}

openNav.addEventListener("click", displayNav);
closeNav.addEventListener("click", hideNav);

window.addEventListener("scroll", paralax);
