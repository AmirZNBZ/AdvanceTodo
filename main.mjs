import {
  createElementFunction,
  createToastFunction,
  createdCardFunction,
  createdListFunction,
} from "./app.mjs";

// Global Selects
// const titleInput = document.querySelector(".list-header__title");
const sideNav = document.querySelector(".side-nav");
const directionArrows = document.querySelector(".fa-chevron-left");
const sideNavArrow = document.querySelector(".side-nav__arrow_left");
// END Global Selects

// Global Values
// let titleInputValueHolder = titleInput.value;

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

const list = document.querySelector(".list");
const formElements = document.querySelector(".list-name");
const listAdd = document.querySelector(".list-add");
const listTitle = document.querySelector("#listTitle");
list.addEventListener("click", (e) => {
  const clickedElement = e.target;
  if (
    clickedElement.classList.contains("list") ||
    clickedElement.classList.contains("add-list-icon__btn") ||
    clickedElement.classList.contains("list-add-title")
  ) {
    formElements.style.display = "block";
    listAdd.style.display = "none";
  } else if (clickedElement.classList.contains("close-list-icon__btn")) {
    formElements.style.display = "none";
    listAdd.style.display = "flex";
  } else if (clickedElement.classList.contains("add-list-name")) {
    if (!listTitle.value) {
      listTitle.focus();
      const errField = listTitle.placeholder.replace("...", "");
      createToastFunction(errField, "Please Fill List Title", 2000);
      return;
    }
    const listContent = document.querySelector(".list-content");
    listContent.insertAdjacentHTML(
      "afterbegin",
      createdListFunction(listTitle.value, listTitle.value)
    );

    listTitle.value = "";
    formElements.style.display = "none";
    listAdd.style.display = "flex";

    const createdLists = document.querySelectorAll(".created-lists");
    createdLists.forEach((list) => {
      list.addEventListener("click", handleClick);
    });
    // formElements.style.display = "none";
    // listAdd.style.display = "flex";
    // addListIconBtn.style.display = "none";
    // listAddTitle.textContent = listTitle.value;
  }
  list.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  });
});

const handleClick = (e) => {
  const clickedElement = e.target;
  const clickedList = clickedElement.closest(".created-lists");
  const cardTitle = document.querySelector("#cardTitle");
  if (
    clickedElement.classList.contains("list-header") ||
    clickedElement.classList.contains("list-header__title")
  ) {
    listTitleHeaderFunction();
  } else if (
    clickedElement.classList.contains("add-card") ||
    clickedElement.classList.contains("add-card-icon__btn") ||
    clickedElement.classList.contains("add-card__btn")
  ) {
    const ListAddCard = document.querySelectorAll(".add-card");
    Array.from(ListAddCard).filter((addCard) => {
      if (addCard.id === clickedList.id) {
        const cardName = document.querySelector(`#${clickedList.id} .card-name`);
        console.log("<><><><>", `#${clickedList.id } .card-name`);
        cardName.style.display = "block";
        addCard.style.display = "none";
        cardTitle.focus();
        cardName.addEventListener("click", (e) => {
          if (e.target.classList.contains("close-card-icon__btn")) {
            cardName.style.display = "none";
            addCard.style.display = "block";
            // Adding A Card When Clicked On Add Card BTN
          } else if (e.target.classList.contains("add-card-title__btn")) {
            if (!cardTitle.value) {
              cardTitle.focus();
              return;
            }
            const cardsContainer = document.querySelector(`#${clickedList.id} .cards-container`);
            console.log("cardsContainer=====>>>",`#${clickedList.id} .cards-container`);
            const createdCardContainer = createElementFunction("div");
            createdCardContainer.classList.add("created-card-container");

            createdCardContainer.innerHTML = createdCardFunction(
              cardTitle.value
            );
            cardsContainer.appendChild(createdCardContainer);
            cardTitle.value = "";
            cardName.style.display = "none";
            addCard.style.display = "block";
            createdCardActions();
          }
        });
      }
    });
    addCardFunction(clickedList.id, clickedElement.closest(".created-lists"));
  }
};

// Change the list Name
const listTitleHeaderFunction = (e) => {
  const titleInput = document.querySelector(".list-header__title");
  let titleInputValueHolder = titleInput.value;
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
};

// Show Form Add Card For Creating A CARD
const addCardFunction = (id, clickedElement) => {
  // const addCard = document.querySelector(`#${id}`);
  // addCard.addEventListener("click", (e) => {});
  // const addCard = document.querySelector(".add-card");

  // const cardTitle = document.querySelector("#cardTitle");

  // addCard.addEventListener("click", (e) => {
  //   const cardName = document.querySelector(".card-name");
  //   if (
  //     e.target.classList.contains("add-card") ||
  //     e.target.classList.contains("add-card-icon__btn") ||
  //     e.target.classList.contains("add-card__btn")
  //   ) {
  //     cardName.style.display = "block";
  //     addCard.style.display = "none";
  //     cardTitle.focus();
  //   }
  //   cardName.addEventListener("click", (e) => {
  //     if (e.target.classList.contains("close-card-icon__btn")) {
  //       cardName.style.display = "none";
  //       addCard.style.display = "block";
  //       // Adding A Card When Clicked On Add Card BTN
  //     } else if (e.target.classList.contains("add-card-title__btn")) {
  //       if (!cardTitle.value) {
  //         cardTitle.focus();
  //         return;
  //       }
  //       const cardsContainer = document.querySelector(".cards-container");
  //       const createdCardContainer = createElementFunction("div");
  //       createdCardContainer.classList.add("created-card-container");

  //       createdCardContainer.innerHTML = createdCardFunction(cardTitle.value);
  //       cardsContainer.appendChild(createdCardContainer);
  //       cardTitle.value = "";
  //       cardName.style.display = "none";
  //       addCard.style.display = "block";
  //       createdCardActions();
  //     }
  //   });
  //   cardName.addEventListener("keypress", (e) => {
  //     if (e.key === "Enter") {
  //       e.preventDefault();
  //       if (!cardTitle.value) {
  //         cardTitle.focus();
  //         return;
  //       }
  //       const cardsContainer = document.querySelector(".cards-container");
  //       const createdCardContainer = createElementFunction("div");
  //       createdCardContainer.classList.add("created-card-container");

  //       createdCardContainer.innerHTML = createdCardFunction(cardTitle.value);
  //       cardsContainer.appendChild(createdCardContainer);
  //       cardTitle.value = "";
  //       cardName.style.display = "none";
  //       addCard.style.display = "block";
  //       createdCardActions();
  //     }
  //   });
  // });
};

// Created Card Item Actions for do some Actions
const createdCardActions = (e) => {
  const createdCards = document.querySelectorAll(".created-card-container");
  createdCards.forEach((createdCard) => {
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
  });
  // if (
  //   e.target.classList.contains("created-card__title") ||
  //   e.target.classList.contains("created-card-edit-icons")
  // ) {
  //   console.log("=====> Show The Card Box");
  // } else if (e.target.classList.contains("show-card-icon__btn")) {
  //   console.log("=====> Show The Card Box");
  // } else if (e.target.classList.contains("rename-card-icon__btn")) {
  //   console.log("=====> Rename The Card title");
  // }
};

// SHow Recent Menu
const recentContainer = document.querySelector(".recent");
recentContainer.addEventListener("click", (e) => {
  const arrowDown = recentContainer.childNodes[1].childNodes[3];
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

// SHow Recent Menu
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

// Open The Create Board Box
const openCreateBoard = document.querySelector(".create-board");
openCreateBoard.addEventListener("click", (e) => {
  const newBoardContent = document.querySelector(".create-new-board");
  newBoardContent.style.display = "block";
});

// Close The Create Board Box
const closeCreateBoard = document.querySelector(".close-create-board");
closeCreateBoard.addEventListener("click", (e) => {
  const newBoardContent = document.querySelector(".create-new-board");
  newBoardContent.style.display = "none";
});

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

// when User Click Out Side Of target Like Menu or...
document.addEventListener("click", (e) => {
  const clickedElement = e.target;
  const parentRecentDiv = document.querySelector(".recent");
  const parentStarredDiv = document.querySelector(".starred");
  const recentDropdown = document.getElementById("recent-board-dropdown");
  const starredDropdown = document.getElementById("starred-board-dropdown");
  const createdLists = document.querySelectorAll(".created-lists");

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

  // if (createdLists.length !== 0) {
  //   const clickedList = clickedElement.closest(".created-lists");
  //   console.log(clickedList.id);
  //   const getSelectClickedList = document.querySelector(`#${clickedList.id}`);
  //   console.log("======>", getSelectClickedList);
  //   getSelectClickedList.addEventListener("click", (e) => {
  //     console.log("Amirrrrrrrrrrrrrrrrrrrrrrrrrr", e.target);
  //   });
  // }
});
