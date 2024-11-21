import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { changeURLArg, setMode } from '../../utils';

import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { useNavList } from './useNavList';
import { useNavUrl } from './useNavUrl';

export function useNavEvent() {
  const store = useStore();
  const { locale } = useI18n();
  const { route } = useRoute();
  const { router } = useRouter();
  const { navList } = useNavList();
  const { homeUrl } = useNavUrl();
  const menuState = ref(false);
  const navIndex = ref('');
  const isOpen = ref('false');

  const currentNav = computed(() => {
    if (
      navIndex.value !== '' &&
      navList.value[navIndex.value] &&
      navList.value[navIndex.value].children &&
      !navList.value[navIndex.value].lang
    ) {
      return navList.value[navIndex.value];
    } else {
      return null;
    }
  });

  const isShow = computed(() => {
    return (
      isOpen.value === 'true' &&
      currentNav.value &&
      currentNav.value.title &&
      !currentNav.value.lang
    );
  });

  const isDarkMode = computed(() => {
    return store.state.isDarkMode
  })

  const changeMode = ()=> {
    store.commit('setDarkMode', !isDarkMode.value)
    setMode(isDarkMode.value)
    localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light')
    // changeURLArg({ theme: isDarkMode.value ? 'dark' : 'light' });
  };

  const changeMenuState = () => {
    menuState.value = !menuState.value;
    navIndex.value = '';
  };

  const navGo = (item, index, el) => {
    el.preventDefault();
    if (item.children) {
      index === navIndex.value
        ? (navIndex.value = '')
        : (navIndex.value = index);
    }
    if (item.url && !item.local) {
      return window.open(item.url);
    }
    if (item.url && item.local) {
      router.push(item.url);
    }
  };

  const onMouseenter = () => {
    // console.log('onMouseenter');
    isOpen.value = 'true';
  };

  const onMouseleave = () => {
    // console.log('onMouseleave');
    navIndex.value = '';
    isOpen.value = 'false';
  };

  // 鼠标进入
  const navEnter = (item, index, el) => {
    el.preventDefault();
    isOpen.value = 'true';
    navIndex.value = index;
    if (item.url && !item.local && item.children) {
      return window.open(item.url);
    }
    if (item.url && item.local && item.children) {
      router.push(item.url);
    }
  };

  // 鼠标离开
  const navLeave = (item, index, el) => {
    el.preventDefault();
    isOpen.value = 'false';
    if (item.lang) {
      navIndex.value = '';
    }
  };

  const navChildrenGo = (item, el) => {
    // console.log(item)
    if (el) el.preventDefault();
    if (item.url && !item.local) {
      return window.open(item.url);
    }

    if (item.url && item.local) {
      return window.open(item.url, '_self');
    }

    if (item.lang) {
      if (item.lang === locale.value) return;
      langChange(item.lang);
    }
    navIndex.value = '';
  };

  const langChange = (lang) => {
    locale.value = lang;
    navIndex.value = '';
    menuState.value = false;
    localStorage.setItem('language', lang);
    changeURLArg({ locale: locale.value });
  };

  const indexGo = () => {
    // router.replace('/');
    window.open(homeUrl.value, '_self')
  };

  return {
    changeMode,
    indexGo,
    langChange,
    navChildrenGo,
    navLeave,
    navEnter,
    onMouseleave,
    onMouseenter,
    navGo,
    changeMenuState,
    menuState,
    navIndex,
    isOpen,
    isDarkMode,
    isShow,
    currentNav
  };
}
