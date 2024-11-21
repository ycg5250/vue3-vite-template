import { createI18n } from 'vue-i18n';
import { forEach, includes } from 'lodash';
import zh from './lang/zh';
import en from './lang/en';
import es from './lang/es';
import fil from './lang/fil';
import hi from './lang/hi';
import ja from './lang/ja';
import ko from './lang/ko';
import pt from './lang/pt';
import ru from './lang/ru';
import th from './lang/th';
import vi from './lang/vi';
import zhTw from './lang/zh-tw';

const availableLocale = ['zh', 'en', 'ko', 'ja'];

let defaultLangStr = navigator.language;
let defaultLang = 'zh';

if (defaultLangStr.indexOf('en') >= 0) {
  defaultLang = 'en';
}

const query = location.search.substr(1);
let queryObj = {};

if (query) {
  forEach(query.split('&'), (item) => {
    const tempArr = item.split('=');
    queryObj[tempArr[0]] = tempArr[1];
  });
}

let locale = includes(availableLocale, queryObj['locale'])
  ? queryObj['locale']
  : defaultLang;

// 从官网跳二级页面时，优先根据当前官网语言切换对应页面语言；如果直接输入url进入，则优先根据cookie切换语言；如果没有缓存，则根据浏览器语言
if (queryObj['locale']) {
  locale = queryObj['locale'];
} else {
  locale = localStorage.getItem('language') || locale;
}

export default createI18n({
  legacy: false,
  locale: locale,
  messages: { en, zh, es, fil, hi, ja, ko, pt, ru, th, vi, 'zh-tw': zhTw },
});
