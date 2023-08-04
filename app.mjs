// Global Selects

// Create Element Function
export const createElementFunction = (elementName) => {
  return document.createElement(elementName);
};

// Create Toast Function
export const createToastFunction = (fieldErr, msg, duration) => {
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

export const createdCardFunction = (cardTitleValue) => {
  const createdCard = `<div class="created-card">
  <input
    type="text"
    class="created-card__title"
    value="${cardTitleValue}"
    readonly
  />
  <div class="created-card-edit-icons">
    <i class="fa fa-eye show-card-icon__btn"></i>
    <i class="fa fa-pencil rename-card-icon__btn"></i>
  </div>
</div>`;
  return createdCard;
};
export const createdListFunction = (ListTitleValue, listUniqueId) => {
  const createdList = `<div class="created-lists" id="${listUniqueId}">
  <div class="created-list__items">
    <div class="list-header">
      <input
        class="list-header__title"
        value="${ListTitleValue}"
        readonly
      />
    </div>
    <div class="cards-container">
      
    </div>
    <form class="card-name">
      <input
        type="text"
        name="cardTitle"
        id="cardTitle"
        placeholder="Enter a title for this card..."
      />
      <button type="button" class="add-card-title__btn">
        Add Card
      </button>
      <i class="fa fa-close close-card-icon__btn"></i>
    </form>
    <div class="add-card" id="${listUniqueId}">
      <i class="fa fa-plus add-card-icon__btn"></i>
      <button type="button" class="add-card__btn">
        Add a card
      </button>
    </div>
  </div>
</div>`;
  return createdList;
};
