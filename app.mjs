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