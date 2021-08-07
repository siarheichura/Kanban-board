import { getLocalStorage } from "./storageAPI.js"
import { printCards } from "./Card.js"
import { Clock } from "./Clock.js"
import { Modal } from "./Modal.js"
import { initCardListListeners } from "./CardList.js"
import { bindColumnHandlers } from "./Column.js"

// Data base
export let DB
// Modal class
export const modalAdd = new Modal(document.querySelector('.modal-add'))
export const modalDelteConfirm = new Modal(document.querySelector('.modal-confirm-del'))
export const toastLimit = new Modal(document.querySelector('.toast'))
// Columns
const columns = document.querySelector('.main').children
const columnBadges = document.querySelectorAll('.column__badge')
// Card lists
const cardLists = document.querySelectorAll(".column__card-wrapper")


const app = () => {
    DB = getLocalStorage()
    render()
    new Clock().start()
    bindColumnHandlers(columns)
    modalAdd.initListeners()
    modalAdd.setUsersInDropdown()
    modalDelteConfirm.initConfirmListeners()
}

document.addEventListener("DOMContentLoaded", app);

export const render = () => {
    cardLists.forEach(function (cardList, index) {
        cardList.innerHTML = ''
        cardList.innerHTML = printCards(cardList)
        columnBadges[index].innerText = DB[cardList.id].length
        initCardListListeners(cardList)
    });
}