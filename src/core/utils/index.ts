
export function mouseIsInDragEnterElementArea(
  dragEnterElementArea: any,
  mouseEvent: MouseEvent,
  offset = 1,
) {
  const { left, right, top, bottom } = dragEnterElementArea;
  const { clientX, clientY } = mouseEvent;
  // console.log(left, clientX,  right, "---", top, clientY, bottom)
  if (
    left + offset < clientX &&
    clientX < right - offset &&
    top + offset < clientY &&
    clientY < bottom - offset
  ) {
    return true;
  }
  return false;
}

export const getWorkFlowNodes = () => {
  return localStorage.workFlowNodes
    ? JSON.parse(localStorage.workFlowNodes)
    : null;
};

export function setDragImage(evt: DragEvent, svg: HTMLElement) {
  if (svg) {
    evt?.dataTransfer?.setDragImage(svg, 0, -10);
  }
}

export function childDisable(parentAbleTypes: string[], nodeType: string) {
  if (!parentAbleTypes) {
    return false;
  }
  return !parentAbleTypes.length || !(parentAbleTypes || []).includes(nodeType);
}

export function debounce(fn: (...arg: any[]) => void, delay = 300) {
  let timer: any = null;
  return (...arg: any[]) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn(...arg);
      clearTimeout(timer);
    }, delay);
  };
}

