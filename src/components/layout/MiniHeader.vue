<template>
  <div class="mini-nav">
    <nav class="mini-navbar-wrap" :class="{ isFixed: menuState }">
      <div class="mini-navbar-header">
        <div>
          <img
            class="mini-navbar-logo pointer"
            :src="logoImg"
            @click="indexGo('/')"
          />
        </div>
        <div class="menu-status text-right">
          <!-- <span
            class="mini-navbar-language"
            @click="changeLanguage"
          >{{language === 'zh' ? 'En' : '中文'}}</span>-->
          <!-- <i :class="!menuState ? 'icon-menu' : 'icon-close'" @click="changeMenuState"></i> -->
          <img
            class="menu-img"
            :src="menuImg"
            v-if="!menuState"
            @click="changeMenuState"
            alt
          />
          <img
            :src="closeImg"
            v-else
            @click="changeMenuState"
            alt
          />
        </div>
      </div>

      <div class="mini-menu" v-if="menuState">
        <a
          v-for="(item, index) in navList"
          :key="index"
          style="display: block"
          class="ft-18"
          :href="item.local && item.url ? item.url : 'javascript:void(0)'"
          @click.stop="navGo(item, index, $event)"
        >
          <div class="mini-menu-title" v-if="item.title">
            <!-- 一级菜单 -->
            <div class="menu-item">
              <div class="menu-item-title">{{ item.title }}</div>
              <div class="text-right" v-if="item.children">
                <i
                  :class="[
                    navIndex !== index
                      ? item.lang
                        ? 'icon-earth-mini'
                        : 'icon-right'
                      : 'icon-right icon-dropdown',
                  ]"
                  style="transition: all 0.3s"
                ></i>
              </div>
              <div class="dark-mode-switch" v-if="item.darkMode">
                <Switcher :value="isDarkMode" @switch="changeMode" />
              </div>
            </div>

            <!-- 子菜单 -->
            <div
              class="mini-menu-children"
              v-if="item.children && navIndex === index"
            >
              <a
                class="mini-menu-children-title ft-14"
                v-for="(navChildren, childrenIndex) in item.children"
                :key="childrenIndex"
                @click.stop="navChildrenGo(navChildren, $event)"
                :href="
                  !navChildren.lang && navChildren.url
                    ? navChildren.url
                    : 'javascript:void(0)'
                "
                :target="
                  navChildren.local || navChildren.lang ? '_self' : '_blank'
                "
                >{{ navChildren.title }}</a
              >
            </div>
          </div>
        </a>
      </div>
    </nav>
  </div>
</template>

<script setup>
import Switcher from '../common/Switcher.vue';
import { useNavList } from '../../hooks/nav/useNavList';
const { navList, logoImg } = useNavList();
import { useNavEvent } from '../../hooks/nav/useNavEvent';
const {
  navChildrenGo,
  changeMenuState,
  navGo,
  indexGo,
  changeMode,
  menuState,
  navIndex,
  isDarkMode,
} = useNavEvent();
import { computed } from 'vue';
import useDarkImg from '../../hooks/useDarkImg';
const { darkModeImg } = useDarkImg()

const closeImg = computed(() => {
  return new URL(`../../assets/close-modal${darkModeImg.value}.png`, import.meta.url).href
}) 
const menuImg = computed(() => {
  return new URL(`../../assets/menu${darkModeImg.value}.png`, import.meta.url).href
}) 
</script>

<style lang="scss" scoped>
.icon-earth-mini {
  display: inline-block;
  width: 20px;
  height: 20px;
  background: url('../../assets/earth-mini.png') no-repeat center 100% / cover !important;
  vertical-align: middle;
  margin-top: -2px;
}
.icon-right {
  display: inline-block;
  position: relative;
  width: 14px;
  height: 14px;
  // transform: scale(0.8);
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 2px;
    width: 10px;
    height: 10px;
    border-top: 2px solid var(--header-nav-title-color);
    border-right: 2px solid var(--header-nav-title-color);
    transform: rotate(45deg);
    box-sizing: border-box;
  }
}
.text-right {
  text-align: right;
}
.mini-navbar-wrap {
  height: 60px;
}
.isFixed {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 99999;
  background: var(--bg-22);
  height: auto;
}


.mini-navbar-header {
  display: flex;
  padding: 15px 28px;
  height: 60px;
  &.route-dappstore {
    padding: 15px 16px;
  }

  div {
    flex: 1;
  }

  .mini-navbar-logo {
    width: 156px;
    margin-top: 5px;
  }
}

.mini-menu {
  height: calc(100vh - 68px);
  overflow-x: auto;
}

.menu-item {
  display: flex;
  align-items: center;
  div {
    flex: 1;
  }
  .menu-item-title {
    color: var(--color-13);
    font-size: 14px;
  }
  .dark-mode-switch {
    .switch-wrap {
      display: flex;
      justify-content: end;
    }
  }
}

.mini-menu-children {
  padding-left: 2em;
}

.mini-menu-title {
  padding: 15px;
  border-bottom: 1px solid var(--dividing-line-bg-1);
}

.mini-menu-children-title {
  display: block;
  padding-top: 15px;
  color: var(--color-13);
  font-size: 14px;
}

.menu-status {
  display: flex;
  align-items: center;
  justify-content: flex-end;

  img {
    width: 20px;
    height: 20px;
  }
  .menu-img {
    width: 24px;
    height: 24px;
  }
}

.mini-navbar-language {
  font-size: 18px;
  margin-right: 20px;
}

.icon-dropdown {
  transform: rotate(90deg);
}

@media screen and (max-width: 420px) {
  .navbar-logo {
    img {
      width: initial;
      height: 24px;
      max-height: 32px;
    }
  }

  .menu-status {
    span {
      display: inline-block;
      /*padding: 5px;*/
      width: 30px;
      text-align: center;
      margin-right: 10px;
    }

    img {
      width: 16px;
      height: 16px;
    }
    .menu-img {
      width: 24px;
      height: 24px;
    }
  }
  .mini-menu {
    height: calc(100vh - 60px);
    overflow-x: auto;
  }

  .mini-navbar-language {
    font-size: 16px;
  }
}
</style>
