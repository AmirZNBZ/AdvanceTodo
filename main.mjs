import { createElementFunction, createToastFunction } from "./app.mjs";

// Global Selects 
const titleInput = document.querySelector(".list-header__title");
const sideNav = document.querySelector(".side-nav");
const directionArrows = document.querySelector(".fa-chevron-left");
const sideNavArrow = document.querySelector(".side-nav__arrow_left");
// END Global Selects

// Global Values
let titleInputValueHolder = titleInput.value;

// Get Show & Hide Side Nav
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
const listContent = document.querySelector(".list-content");
const formElements = document.querySelector(".list-name");
const listAdd = document.querySelector(".list-add");
const addListName = document.querySelector(".add-list-name");
const listAddTitle = document.querySelector(".list-add-title");
const listTitle = document.querySelector("#listTitle");
const addListIconBtn = document.querySelector(".add-list-icon__btn");
list.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("list") ||
    e.target.classList.contains("add-list-icon__btn") ||
    e.target.classList.contains("list-add-title")
  ) {
    formElements.style.display = "block";
    listAdd.style.display = "none";
  } else if (e.target.classList.contains("close-list-icon__btn")) {
    formElements.style.display = "none";
    listAdd.style.display = "flex";
  } else if (e.target.classList.contains("add-list-name")) {
    if (!listTitle.value) {
      listTitle.focus();
      const errField = listTitle.placeholder.replace("...", "");
      createToastFunction(errField, "Please Fill List Title", 2000);
      return;
    }
    formElements.style.display = "none";
    listAdd.style.display = "flex";
    addListIconBtn.style.display = "none";
    listAddTitle.textContent = listTitle.value;
  }
  list.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  });
});

// Change the list Name
const listHeaderTitle = document.querySelector(".list-header");

listHeaderTitle.addEventListener("click", () => {
  titleInput.classList.add("list-header__title-editable");
  titleInput.setSelectionRange(0, titleInput.value.length);
  titleInput.removeAttribute("readonly");
  listHeaderTitle.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!titleInput.value) {
        titleInput.focus();
        titleInput.value = titleInputValueHolder;
      }
      titleInput.setAttribute("readonly", true);
      titleInput.setSelectionRange(0, 0);
      titleInput.classList.remove("list-header__title-editable");
      titleInputValueHolder = titleInput.value;
    }
  });
});

const recentDiv = document.querySelector(".recent");
recentDiv.addEventListener("click", (e) => {
  const arrowDown = recentDiv.childNodes[1].childNodes[3];
  const recentBoardDropDown = document.getElementById("recent-board-dropdown");
  recentBoardDropDown.classList.toggle("show");
  if (recentBoardDropDown.classList.contains("show")) {
    arrowDown.classList.add("fa-chevron-up");
    arrowDown.classList.remove("fa-chevron-down");
  } else {
    arrowDown.classList.remove("fa-chevron-up");
    arrowDown.classList.add("fa-chevron-down");
  }
});

const starredContainer = document.querySelector(".starred");
starredContainer.addEventListener("click", (e) => {
  const arrowDown = starredContainer.childNodes[1].childNodes[3];
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
});

const openCreateBoard = () => {
  const newBoardContent = document.querySelector(".create-new-board");
  newBoardContent.style.display = "block";
};

const closeCreateBoard = () => {
  const newBoardContent = document.querySelector(".create-new-board");
  newBoardContent.style.display = "none";
};

// Show Password Form when User Select Private For Here Board
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

const addCard = document.querySelector(".add-card");
addCard.addEventListener("click", (e) => {
  const cardName = document.querySelector(".card-name");
  if (
    e.target.classList.contains("add-card") ||
    e.target.classList.contains("add-card-icon__btn") ||
    e.target.classList.contains("add-card__btn")
  ) {
    cardName.style.display = "block";
    addCard.style.display = "none";
  }
  cardName.addEventListener("click", (e) => {
    if (e.target.classList.contains("close-card-icon__btn")) {
      cardName.style.display = "none";
      addCard.style.display = "block";
    }
    // else if (e.target.classList.contains("add-card-title__btn")) {
  });
  cardName.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  });
});

const btnAddCard = document.querySelector(".add-card-title__btn");
btnAddCard.addEventListener("click", (e) => {
  const cardsContainer = document.querySelector(".cards-container");
  const cardTitle = document.querySelector("#cardTitle");
  const createdCardContainer = createElementFunction("div");
  createdCardContainer.classList.add("created-card-container");

  const createdCard = `
  <div class="created-card">
    <input
      type="text"
      class="created-card__title"
      value="${cardTitle.value}"
      readonly
    />
    <div class="created-card-edit-icons">
      <i class="fa fa-eye show-card-icon__btn"></i>
      <i class="fa fa-pencil rename-card-icon__btn"></i>
    </div>
  </div>`;
  createdCardContainer.innerHTML = createdCard;
  cardsContainer.appendChild(createdCardContainer);
});

// when User Click Out Side Of target Like Menu or...
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

  if (!clickedElement.closest(".list-header") === true) {
    if (!titleInput.value) {
      titleInput.focus();
      titleInput.value = titleInputValueHolder;
    }
    titleInput.setAttribute("readonly", true);
    titleInput.setSelectionRange(0, 0);
    titleInput.classList.remove("list-header__title-editable");
    titleInputValueHolder = titleInput.value;
  }
});

const createdCard = document.querySelector(".created-card");
createdCard.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("created-card__title") ||
    e.target.classList.contains("created-card-edit-icons")
  ) {
    console.log("=====> Show The Card Box");
  } else if (e.target.classList.contains("show-card-icon__btn")) {
    console.log("=====> Show The Card Box");
  } else if (e.target.classList.contains("rename-card-icon__btn")) {
    console.log("=====> Rename The Card title");
  }
});
