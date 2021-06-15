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
