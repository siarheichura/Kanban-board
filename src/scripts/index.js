import { getLocalStorage, setLocalStorage } from "./storageAPI";
import { printCards, displayUser } from "./Card";
import { changeModalTitle, toggleModal, initModalListeners, initModalDeleteListeners } from "./modal";
import { Clock } from "./clock";

// Data base
export let DB;
// Columns
const columns = document.querySelector('.main').children;
const columnBadges = document.querySelectorAll(".column__badge");
// Card lists
const cardLists = document.querySelectorAll(".column__card-wrapper");
// Modal
const modalAdd = document.querySelector(".modal-add");
const modalTitle = document.querySelector(".modal__title");
const modalTitleInput = document.querySelector(".modal__input-heading");
const modalDescriptionInput = document.querySelector(".modal__input-comment");
const modalUsernameDrop = document.querySelector(".modal__dropdown");
const modalDeleteAll = document.querySelector(".modal-del");
// Toast
const toast = document.querySelector(".toast");
// Audio
const audioGeegun = document.querySelector(".geegun");

const app = () => {
    DB = getLocalStorage();
    render();
    new Clock().start()
    bindColumnHandlers()
    initModalListeners(modalAdd, DB, modalTitleInput, modalDescriptionInput, modalUsernameDrop);
    initModalDeleteListeners(modalDeleteAll);
    displayUser(modalUsernameDrop);
}

document.addEventListener("DOMContentLoaded", app);

const initColumnHandler = (event, column) => {
    let { target } = event
    if(target.classList.contains("column__button--addTodo")) {
        changeModalTitle("Дадаць новую справу", modalTitle);
        toggleModal(modalAdd);
    } else if(target.classList.contains("column__button--deleteAll")) {
        if(column.classList.contains('column-todo')) {
            DB.todo.length = 0;
        } else if(column.classList.contains('column-progress')) {
            toggleModal(modalDeleteAll);
        } else if(column.classList.contains('column-done')) {
            DB.done.length = 0;
        }
        setLocalStorage(DB);
        render();
    }
}

const bindColumnHandlers = () => {
    for(let column of columns){
        column.addEventListener('click', event => {
            initColumnHandler(event, column)
        })
    }
}

const initCardListListeners = (cardList) => {
    let { todo, progress, done } = DB
    cardList.childNodes.forEach(function (card, index) {
        card.addEventListener("click", function (event) {
        let { target } = event;
        if (target.classList.contains("card__close-btn")) {
            DB[cardList.id] = DB[cardList.id].filter(item => item.id !== card.id)
            setLocalStorage(DB);
            render();
        } else if (target.classList.contains("card__edit-btn")) {
            toggleModal(modalAdd);
            changeModalTitle("Змянiць справу", modalTitle);
            modalTitleInput.value = todo[index].title;
            modalDescriptionInput.value = todo[index].description;
            modalUsernameDrop.value = todo[index].username;
            todo.splice(index, 1);
            setLocalStorage(DB);
            render();
        } else if (target.classList.contains("card__swipe-btn")) {
            if (cardList.id === 'todo') {
                if (progress.length > 5) {
                    audioGeegun.play();
                    toggleModal(toast);
                    setTimeout(() => {
                        toggleModal(toast)
                    }, 5000);
                } else {
                    todo[index].themeIsRed = !todo[index].themeIsRed
                    todo[index].isEditable = !todo[index].isEditable
                    progress.push(todo[index]);
                    todo.splice(index, 1);
                    setLocalStorage(DB);
                    render();
                }
            } else if (cardList.id === 'progress') {
                progress[index].themeIsRed = !progress[index].themeIsRed
                done.push(progress[index]);
                progress.splice(index, 1);
            } else if (cardList.id === 'done') {
                done[index].isEditable = !done[index].isEditable
                done[index].description = '';
                todo.push(done[index]);
                done.splice(index, 1);
            }
            setLocalStorage(DB);
            render();
            }
        });
    });
}

export const render = () => {
    cardLists.forEach(function (cardList, index) {
        cardList.innerHTML = "";
        cardList.innerHTML = printCards(DB, cardList);
        columnBadges[index].innerText = DB[cardList.id].length;
        initCardListListeners(cardList);
    });
}