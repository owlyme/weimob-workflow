const requestAnimationFrame = window.requestAnimationFrame ? window.requestAnimationFrame : 
    (cb: () => void) => {
        return setTimeout(() => cb(), 16.67)
    };

const cancelId = window.cancelAnimationFrame || clearTimeout

export default function (callback: () => void) {
    // const eleSizelist: any[] = []
    let count = 0;
    let animtionId:any = null;

    // console.log(targetNode.offsetHeight)
    // eleSizelist.push({
    //     h: targetNode.offsetHeight,
    //     w: targetNode.offsetWidth,
    // })

    function step() {
        // if (eleSizelist.length >= 2) {
        //     eleSizelist.shift()
        // }

        // console.log(targetNode, eleSizelist)

        // console.log(targetNode.offsetHeight)
        callback()
        // const [s1, s2] = eleSizelist;
        // if (!s1 || !s2 || s1.width != s2.width || s1.height != s2.height) { // 在两秒后停止动画
        if (count < 20) {
            count++
            animtionId = requestAnimationFrame(step);
        } else if (animtionId) {
            cancelId(animtionId)
        }
    }
    animtionId = requestAnimationFrame(step);
}