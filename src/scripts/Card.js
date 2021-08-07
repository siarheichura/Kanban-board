import { DB } from "./index.js"

export function Card([title, description, username]) {
    this.title = title
    this.description = description
    this.username = username
    this.themeIsRed = true
    this.date = new Date().toLocaleDateString()
    this.time = new Date().toLocaleTimeString()
    this.id = Math.random().toString(36).substr(2, 9)
    this.isEditable = true
}

export const getCardTemplate = ({title, description, username, themeIsRed, date, time, id, isEditable}) => {
  let theme = themeIsRed ? 'red' : 'white'
  return `<div class="card card--${theme}" id="${id}">
                <div class="card__heading">
                    <div class="card__date-wrap--${theme}">
                        <p class="card__date">${date}</p>
                        <p class="card__time">${time}</p>
                    </div>
                    <div class="card__buttons">
                        ${isEditable ? '<button class="card__edit-btn card__edit-btn--red"></button>' : ''}                        
                        <button class="card__close-btn card__close-btn--${theme}"></button>
                    </div>
                </div>
                <div class="card__body">
                    <div class="card__info">
                        <div class="card__title">${title}</div>
                        <div class="card__description">${description}</div>
                        <div class="card__username">${username}</div>
                    </div>
                    <button class="card__swipe-btn card__swipe-btn--${theme}"></button>
                </div>
            </div>`
}

export const printCards = (cardList) => DB[cardList.id].map(getCardTemplate).join('')