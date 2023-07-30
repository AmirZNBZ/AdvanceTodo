const sideNav = document.querySelector(".side-nav");
const sideNavArrow = document.querySelector(".side-nav__arrow_left");
const directionArrows = document.querySelector(".fa-chevron-left");

sideNavArrow.addEventListener("click", () => {
  if (sideNav.classList.contains("side-nav__show")) {
    sideNav.classList.add("side-nav__hide");
    sideNav.classList.remove("side-nav__show");
    directionArrows.classList.remove("fa-chevron-left");
    directionArrows.classList.add("fa-chevron-right"); // Change Arrow to right
    sideNavArrow.classList.add("side-nav__arrow_right");
    sideNavArrow.classList.remove("side-nav__arrow_left");
  } else if (sideNav.classList.contains("side-nav__hide")) {
    sideNav.classList.add("side-nav__show");
    sideNav.classList.remove("side-nav__hide");
    sideNav.classList.add("side-nav");
    directionArrows.classList.add("fa-chevron-left");
    directionArrows.classList.remove("fa-chevron-right"); // Remove Arrow to right
    sideNavArrow.classList.remove("side-nav__arrow_right");
    sideNavArrow.classList.add("side-nav__arrow_left");
  }
});

const lists = document.querySelector(".lists");
const list = document.querySelector(".list");
const mainContent = document.querySelector(".list-content");
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
    if (!listTitle.value) {
      listTitle.focus();
      const errField = listTitle.placeholder.replace("...", "");
      createToastFunction(errField, "Please Fill List Title", 2000)
      return;
    }
    formElements.style.display = "none";
    listAdd.style.display = "flex";
    faPlusIcon.style.display = "none";
    listAddTitle.textContent = listTitle.value;
  }
});

const showRecent = () => {
  const parentDiv = document.getElementsByClassName("recent");
  const arrowDown = parentDiv[0].childNodes[1].childNodes[3];
  const recentBoardDropDown = document.getElementById("recent-board-dropdown");
  recentBoardDropDown.classList.toggle("show");
  if (recentBoardDropDown.classList.contains("show")) {
    arrowDown.classList.add("fa-chevron-up");
    arrowDown.classList.remove("fa-chevron-down");
  } else {
    arrowDown.classList.remove("fa-chevron-up");
    arrowDown.classList.add("fa-chevron-down");
  }
};

const showStarred = () => {
  const parentDiv = document.getElementsByClassName("starred");
  const arrowDown = parentDiv[0].childNodes[1].childNodes[3];
  const starredBoardDropDown = document.getElementById(
    "starred-board-dropdown"
  );
  starredBoardDropDown.classList.toggle("show");
  if (starredBoardDropDown.classList.contains("show")) {
    arrowDown.classList.add("fa-chevron-up");
    arrowDown.classList.remove("fa-chevron-down");
  } else {
    arrowDown.classList.remove("fa-chevron-up");
    arrowDown.classList.add("fa-chevron-down");
  }
};

const openCreateBoard = () => {
  const newBoardContent = document.querySelector(".create-new-board");
  newBoardContent.style.display = "block";
};
const closeCreateBoard = () => {
  const newBoardContent = document.querySelector(".create-new-board");
  newBoardContent.style.display = "none";
};

const boardPrivacySelect = document.getElementById("boardprivacyselect");
boardPrivacySelect.addEventListener("change", () => {
  const selectedPrivacy = boardPrivacySelect.value;
  const passwordBoard = document.querySelector(".board-password");
  if (selectedPrivacy === "private") {
    passwordBoard.style.display = "flex";
  } else {
    passwordBoard.style.display = "none";
  }
});

document.addEventListener("click", (e) => {
  const clickedElement = e.target;
  const parentRecentDiv = document.querySelector(".recent");
  const parentStarredDiv = document.querySelector(".starred");
  const recentDropdown = document.getElementById("recent-board-dropdown");
  const starredDropdown = document.getElementById("starred-board-dropdown");

  if (
    !clickedElement.closest("#recent-board-dropdown") &&
    !clickedElement.closest(".recent") &&
    clickedElement.id !== "recent"
  ) {
    recentDropdown.classList.remove("show");
    const arrowDown = parentRecentDiv.childNodes[1].childNodes[3];
    arrowDown.classList.remove("fa-chevron-up");
    arrowDown.classList.add("fa-chevron-down");
  }

  if (
    !clickedElement.closest("#starred-board-dropdown") &&
    !clickedElement.closest(".starred") &&
    clickedElement.id !== "starred"
  ) {
    starredDropdown.classList.remove("show");
    const arrowDown = parentStarredDiv.childNodes[1].childNodes[3];
    arrowDown.classList.remove("fa-chevron-up");
    arrowDown.classList.add("fa-chevron-down");
  }
});


// Create Toast Function
const createToastFunction = (fieldErr, msg, duration) => {
  const container = document.querySelector(".container");
  const toastContainer = createElementFunction("div");
  toastContainer.classList.add("toast-container");
  const toastContent = createElementFunction("div");

  setTimeout(function () {
    toastContainer.classList.add("toast-container__show");
  }, 200);

  setTimeout(function () {
    container.removeChild(toastContainer);
    setTimeout(function () {
      toastContainer.removeChild(toastContent);
    }, 500);
  }, duration);

  toastContent.textContent = fieldErr + msg;
  toastContainer.appendChild(toastContent);

  container.appendChild(toastContainer);
};

const createElementFunction = (elementName) => {
  return document.createElement(elementName);
};