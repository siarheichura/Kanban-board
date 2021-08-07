import { DB, modalAdd, modalDelteConfirm, render } from "./index.js"
import { setLocalStorage } from "./storageAPI.js"

const initColumnHandler = (event, column) => {
    let { target } = event
    if(target.classList.contains("column__button--addTodo")) {
        modalAdd.print()        
        modalAdd.setTitle('Дадаць новую справу')
    } else if(target.classList.contains("column__button--deleteAll")) {
        if(column.classList.contains('column-todo')) {
            DB.todo.length = 0;
        } else if(column.classList.contains('column-progress')) {
            modalDelteConfirm.print()
        } else if(column.classList.contains('column-done')) {
            DB.done.length = 0;
        }
        setLocalStorage(DB);
        render();
    }
}

export const bindColumnHandlers = (columns) => {
    for(let column of columns){
        column.addEventListener('click', event => {
            initColumnHandler(event, column)
        })
    }
}