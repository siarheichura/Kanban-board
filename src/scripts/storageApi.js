export const setLocalStorage = (data) => {
    localStorage.setItem('DB', JSON.stringify(data))
}

export const getLocalStorage = () => {
    let tasks = JSON.parse(localStorage.getItem('DB'))
    return tasks ??= {
        todo: [],
        progress: [],
        done: []
    }
}