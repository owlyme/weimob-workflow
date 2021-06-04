export const fromPorpertiesParseToString = (obj: object) => {
  const newObj = {};
  for (const key in obj) {
    const value = obj[key];
    if (Object.prototype.toString.call(value) === '[object Object]') {
      const stepValue = fromPorpertiesParseToString(value);
      Object.keys(stepValue).forEach(stepKey => {
        newObj[`${key}.${stepKey}`] = stepValue[stepKey];
      });
    } else {
      newObj[key] = value;
    }
  }
  return newObj;
};

export const fromPorpertiesParseToObject = (obj: object) => {
  const newObj = {};
  const fn = (arr, value) => {
    const len = arr.length;
    let index = 0;
    arr.reduce((acc, key) => {
      if (index < len - 1) {
        acc[key] = acc[key] || {};
        ++index;
        return acc[key];
      } else {
        acc[key] = value;
      }
    }, newObj);
  };

  for (const key in obj) {
    const keys = key.split('.');
    const value = obj[key];
    fn(keys, value);
  }
  return newObj;
};

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

export function setDragImage(evt: MouseEvent, svg) {
  if (svg) {
    evt.dataTransfer.setDragImage(svg, 0, -10);
  }
}

export function childDisable(parentAbleTypes: [], nodeType: string) {
  if (!parentAbleTypes) {
    return false;
  }
  return !parentAbleTypes.length || !(parentAbleTypes || []).includes(nodeType);
}

export function debounce(fn, delay = 300) {
  let timer = null;
  return (...arg) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn(...arg);
      clearTimeout(timer);
    }, delay);
  };
}

export const onFormChangeDebounce = debounce(cb => cb());
