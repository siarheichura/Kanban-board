import { DB, render, modalAdd, toastLimit  } from "./index.js"
import { setLocalStorage } from "./storageAPI.js"

export const initCardListListeners = (cardList) => {
    cardList.childNodes.forEach(function(card, index) {
        card.addEventListener('click', function (event) {
            let { target } = event
            if (target.classList.contains('card__close-btn')) {
                deleteCard(cardList, card)
            } else if (target.classList.contains('card__edit-btn')) {
                editCard(index)
            } else if (target.classList.contains('card__swipe-btn')) {
                swipeCard(cardList, index)
            }
        });
    });
}

function deleteCard(cardList, card) {
    DB[cardList.id] = DB[cardList.id].filter(item => item.id !== card.id)
    setLocalStorage(DB)
    render()
}

function editCard(index) {
    modalAdd.print()
    modalAdd.setTitle('Змянiць справу')
    modalAdd.setInputsValue(index)
    DB.todo.splice(index, 1)
    setLocalStorage(DB)
    render()
}

function swipeCard(cardList, index) {
    let { todo, progress, done } = DB
        if (cardList.id === 'todo') {
            if (progress.length > 5) {
                printLimitToast()
            } else {
                todo[index].themeIsRed = !todo[index].themeIsRed
                todo[index].isEditable = !todo[index].isEditable
                progress.push(todo[index])
                todo.splice(index, 1)
            }
        } else if (cardList.id === 'progress') {
            progress[index].themeIsRed = !progress[index].themeIsRed
            done.push(progress[index])
            progress.splice(index, 1)
        } else if (cardList.id === 'done') {
            done[index].isEditable = !done[index].isEditable
            done[index].description = ''
            todo.push(done[index])
            done.splice(index, 1)
        }
        setLocalStorage(DB)
        render()
}

function printLimitToast() {
    let audioGeegun = document.querySelector('.geegun')
    audioGeegun.play()
    toastLimit.print()
    setTimeout(() => {
        toastLimit.close()
    }, 5000)
}