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
