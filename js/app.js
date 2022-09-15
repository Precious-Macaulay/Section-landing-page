/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
 */

/**
 * Define Global Variables
 * Assign all section node to a variable
 */

var sections = document.querySelectorAll("section");

// Assign the navigation list node to a variable
var navList = document.getElementById("navbar__list");

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

// Get the data-nav value from each section and return an array of all data-nav attribute value
function getNavDataSet() {
  let datasetArr = [];
  sections.forEach((element) => {
    datasetArr.push(element.dataset.nav);
  });
  return datasetArr;
}

// Get an array of all menu__link
function getMenuLinks() {
  let menuLinks = document.getElementsByClassName("menu__link");
  return menuLinks;
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

//the function creates a li element that nest an anchor element with text from the nav data set
function buildListElement(element, index) {
  let newLi = document.createElement("li");
  let newA = document.createElement("a");
  newA.innerHTML = element;
  newLi.appendChild(newA);
  newA.setAttribute("class", "menu__link");
  newA.setAttribute("id", `${index + 1}`);
  return newLi;
}

//This function build the navigation bar
function buildNav() {
  getNavDataSet().forEach((element, index) => {
    const listElement = buildListElement(element, index);
    navList.appendChild(listElement);
  });
}

// check if section is near top of viewport
function isInViewport(elem) {
  var distance = elem.getBoundingClientRect();
  return (
    distance.top >= 0 &&
    distance.left >= 0 &&
    distance.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    distance.right <=
      (window.innerWidth || document.documentElement.clientWidth)
  );
}

//add class "your-active-class" to section and add class active to navigation menu link near viewport
function addClass(event) {
  // add event on scroll
  sections.forEach((element, index) => {
    //for each .this is a test
    if (isInViewport(element)) {
      //if in Viewport add class
      element.classList.add("your-active-class");
      getMenuLinks()[index].classList.add("active");
    } else {
      element.classList.remove("your-active-class");
      getMenuLinks()[index].classList.remove("active");
    }
  });
}

// Scroll to anchor ID using scrollTO event
function scrollToId(event) {
  let targetSectionId = "section" + event.target.id;
  let targetSection = document.getElementById(targetSectionId);
  window.scrollTo({
    top: targetSection.offsetTop,
    left: targetSection.offsetLeft,
    behavior: "smooth",
  });
}
/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu
window.addEventListener("load", buildNav);
// Scroll to section on link click
navList.addEventListener("click", scrollToId, false);
// Set sections as active
window.addEventListener("scroll", addClass, false);
