function setDebounce(callback: () => void, delay: number) {
    let timer: any
    return function () {
        clearTimeout(timer)
        timer = setTimeout(() => {
            callback();
        }, delay)
    }
}

export default setDebounce