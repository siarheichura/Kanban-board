export class Clock {
    #getDate() {
        const time = new Date()
        const date = {
            hours: time.getHours(),
            minutes: time.getMinutes(),
        }
        return date
    }

    #update() {
        let hours = document.querySelector('.clock__hours')
        let minutes = document.querySelector('.clock__minutes')
        let date = this.#getDate()

        hours.innerText = date.hours.toString().padStart(2, '0')
        minutes.innerText = date.minutes.toString().padStart(2, '0')
    }

    start() {
        this.#update()
        let separator = document.querySelector('.clock__separator')

        setInterval(() => {
            this.#update()
            separator.classList.toggle('opacity')
        }, 1000);
    }    
}