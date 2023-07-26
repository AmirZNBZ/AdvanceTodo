const sideNav = document.querySelector(".side-nav");
const show = document.querySelector(".fa-chevron-right");
const closeList = document.querySelector(".fa-close");

show.addEventListener("click", () => {
  if (sideNav.classList.contains("side-nav__show")) {
    sideNav.classList.add("side-nav__hide");
    // main.style.transition = "all 1s ease";
    sideNav.classList.remove("side-nav__show");
    // sideNav.classList.remove("side-nav");
  } else if (sideNav.classList.contains("side-nav__hide")) {
    sideNav.classList.add("side-nav__show");
    sideNav.classList.add("side-nav");
    sideNav.classList.remove("side-nav__hide");
  }
});

const list = document.querySelector(".list");
const formElements = document.querySelector(".list-name");
const listAdd = document.querySelector(".list-add");
const addListName = document.querySelector(".add-list-name");
const listAddTitle = document.querySelector(".list-add-title");
const listTitle = document.querySelector("#listTitle");
const faPlusIcon = document.querySelector(".fa-plus");

list.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("list") ||
    e.target.classList.contains("fa-plus") ||
    e.target.classList.contains("list-add-title")
  ) {
    formElements.style.display = "block";
    listAdd.style.display = "none";
  } else if (e.target.classList.contains("fa-close")) {
    formElements.style.display = "none";
    listAdd.style.display = "flex";
  } else if (e.target.classList.contains("add-list-name")) {
    formElements.style.display = "none";
    listAdd.style.display = "flex";
    faPlusIcon.style.display = "none";
    listAddTitle.textContent = listTitle.value;
  }
});

// closeList.addEventListener("click", (e) => {
//   listAdd.style.display = "flex";
//   formElements.style.display = "none";
// });
