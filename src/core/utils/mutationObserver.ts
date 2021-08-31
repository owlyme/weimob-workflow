const requestAnimationFrame = window.requestAnimationFrame ? window.requestAnimationFrame : 
    (cb: () => void) => {
        return setTimeout(() => cb(), 16.67)
    };

const cancelId = window.cancelAnimationFrame || clearTimeout

export default function (callback: () => void) {
    let count = 0;
    let animtionId:any = null;

    function step() {
        callback()
       
        if (count < 20) {
            count++
            animtionId = requestAnimationFrame(step);
        } else if (animtionId) {
            cancelId(animtionId)
        }
    }
    animtionId = requestAnimationFrame(step);
}