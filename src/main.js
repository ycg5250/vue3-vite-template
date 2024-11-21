import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import i18n from "./i18n";
import './style/index.scss';
import { changeURLArg, createQueryObj } from './utils';
import { includes } from 'lodash';
import tp from 'tp-js-sdk';

let queryObj = createQueryObj();

// 允许的三种模式，如果都不符合则按照系统的模式
const availableTheme = ['light', 'dark'];
let theme = ''
let queryTheme = includes(availableTheme, queryObj['theme']) ? queryObj['theme'] : 'light';
if (queryObj['theme']) {
  theme = queryTheme
} else {
  theme = localStorage.getItem('theme');
}
// 把 链接中带的 theme 参数去掉
changeURLArg({ theme: '' })

// 不同模式样式
// let mode = window.localStorage.getItem('mode')
if (theme) {
  if (theme === 'dark') {
    document.documentElement.setAttribute('theme', 'dark')
    store.commit('setDarkMode', true)
  } else {
    document.documentElement.removeAttribute('theme')
    store.commit('setDarkMode', false)
  }
} else {
  tp.isDarkMode().then((res) => {
    if (res.result && res.data) {
      store.commit('setDarkMode', res.data)
      // import('./style/dark.scss')
      document.documentElement.setAttribute('theme', 'dark')
    } else {
      // import('./style/light.scss')
      document.documentElement.removeAttribute('theme')
    }
  })
}

createApp(App).use(store).use(i18n).use(router).mount("#app");
