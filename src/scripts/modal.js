import { Card } from "./Card";
import { setLocalStorage } from "./storageAPI";
import { DB, render } from "./index";

export const initModalListeners = (modal, data, ...inputs) => {
  modal.addEventListener("click", (event) => {
    let { target } = event;
    if (target.classList.contains("modal__close")) {
      toggleModal(modal);
      clearInputs(...inputs);
    } else if (target.classList.contains("modal__btn--save")) {
      data.todo.push(new Card(inputs[0].value, inputs[1].value, inputs[2].value));
      clearInputs(...inputs);
      toggleModal(modal);
      setLocalStorage(data);
      render();
    }
  });
}

export const changeModalTitle = (text, modalTitle) => {
  modalTitle.innerText = text;
}

const clearInputs = (...inputs) => {
  inputs.forEach((input) => (input.value = ""));
}

export const toggleModal = (modal) => {
  modal.classList.toggle("d-none");
}

export const initModalDeleteListeners = (modal) => {
  modal.addEventListener("click", (event) => {
    let { target } = event;
    if (target.classList.contains("modal__btn-close--footer")) {
      toggleModal(modal);
    } else if (target.classList.contains("modal__btn--save")) {
      DB.progress.length = 0;
      setLocalStorage(DB);
      render();
      toggleModal(modal);
    }
  });
}