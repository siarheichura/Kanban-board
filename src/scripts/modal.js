import { Card } from "./Card.js"
import { setLocalStorage } from "./storageAPI.js"
import { DB, render } from "./index.js"
import { getUsersList } from "./usersAPI.js"

export class Modal {
    constructor(modal) {
        this.modal = modal
        this.inputs = modal.querySelectorAll('.modal__input')
        this.title = modal.querySelector('.modal__title')
    }

    print() {
        this.modal.classList.remove('d-none')
    }

    close() {
        this.modal.classList.add('d-none')
        this.#clearInputs()
    }

    setTitle(titleText) {
        this.title.innerText = titleText
    }

    #clearInputs() {
        this.inputs.forEach(input => input.value = '')
    }

    #getInputsValue() {
        let inputValues = []
        this.inputs.forEach(input => inputValues.push(input.value))
        return inputValues
    }

    setInputsValue(index) {
        this.inputs[0].value = DB.todo[index].title
        this.inputs[1].value = DB.todo[index].description
        this.inputs[2].value = DB.todo[index].username
    }

    #pushInputValuesToDataBase() {
        DB.todo.push(new Card(this.#getInputsValue()))
    }

    setUsersInDropdown() {
        getUsersList().then(userlist => userlist.forEach(user => {
            let option = new Option(user.name, `${user.name}`)
            this.inputs[2].append(option)
        }))
    }

    initListeners() {
        this.modal.addEventListener('click', event => {
            let { target } = event
            if (target.classList.contains('modal__close')) {
                this.close()
            } else if (target.classList.contains("modal__btn--save")) {
                this.#pushInputValuesToDataBase()
                this.close()
                setLocalStorage(DB)
                render()
            }
        })
    }

    initConfirmListeners() {
        this.modal.addEventListener('click', event => {
            let { target } = event
            if (target.classList.contains("modal__btn-close--footer")) {
                this.close()
            } else if (target.classList.contains("modal__btn--save")) {
                DB.progress.length = 0
                this.close()
                setLocalStorage(DB)
                render()
            }
        })
    }
}