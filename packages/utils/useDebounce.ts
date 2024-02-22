
type CBfunc = () => any

// 防抖
function debounce(timeout: number) {

    let timer: any = null
    
    return function (cd: CBfunc,) {
        if (timer) {
            clearTimeout(timer)
            timer = null
        }
        timer = setTimeout(() => {
            cd?.()
        }, timeout);
    }
}

export default debounce