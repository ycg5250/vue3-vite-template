import { forEach } from "lodash";

/** 设置显示模式 */
export function setMode(mode) {
  if (mode) {
    document.documentElement.setAttribute('theme', 'dark');
  } else {
    document.documentElement.removeAttribute('theme');
  }
}

export function changeURLArg(obj) {
  let queryObj = createQueryObj()
  queryObj = { ...queryObj, ...obj };

  const newQuery = Object.keys(queryObj)
    .filter((key) => queryObj[key])
    .map((key) => `${key}=${queryObj[key]}`)
    .join('&');

  if (newQuery) {
    history.replaceState('', '', `${location.pathname}?${newQuery}${location.hash}`);
  } else {
    history.replaceState('', '', `${location.pathname}${location.hash}`);
  }
}

export function createQueryObj() {
  const query = location.search.slice(1);
  let queryObj = {};
  if (query) {
    forEach(query.split('&'), item => {
      let tempArr = item.split('=');
      queryObj[tempArr[0]] = tempArr[1];
    });
  }
  return queryObj
}