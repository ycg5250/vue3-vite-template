<template>
  <div class="HeaderLayout" :class="{ scrollBg: scroll !== 0 }">
    <NormalHeader class="normal-header" />
    <MiniHeader class="mini-header" />
  </div>
</template>

<script setup>
import { onBeforeMount, onMounted, ref } from 'vue';
import MiniHeader from './MiniHeader.vue';
import NormalHeader from './NormalHeader.vue';

const scroll = ref(0);

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onBeforeMount(() => {
  window.removeEventListener('scroll', handleScroll);
});

const handleScroll = () => {
  scroll.value = document.documentElement.scrollTop || document.body.scrollTop;
};

// export default {
//   components: {
//     MiniHeader,
//     NormalHeader,
//   },
//   props: {
//     navLogo: {
//       type: String,
//       default: require('../../assets/logo.png')
//     },
//     navTitleColor: {
//       type: String,
//       default: '#fff'
//     },
//     // navIconColor: {
//     //   type: String,
//     //   default: '#fff'
//     // },
//     arrowClass: {
//       type: String,
//       default: 'icon-down-333'
//     },
//     langClass: {
//       type: String,
//       default: 'icon-earth'
//     }
//   },

//   data() {
//     return {
//       scroll: 0
//     }
//   },
//   mounted() {
//     window.addEventListener('scroll', this.handleScroll)
//   },
//   methods: {
//     handleScroll() {
//       this.scroll =
//         document.documentElement.scrollTop || document.body.scrollTop
//     }
//   },
//   beforeDestroy() {
//     window.removeEventListener('scroll', this.handleScroll)
//   }
// }
</script>

<style lang="scss" scoped>
.HeaderLayout {
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 9998;
  background: var(--bg-1);
  &.scrollBg {
    filter: drop-shadow(0 2px 5px rgba(0, 0, 0, 0.05));
  }
}
.mini-header {
  display: none;
}

@media screen and (max-width: 1200px) {
  .container {
    max-width: 1200px;
    padding: 0 20px;
  }
  .normal-header {
    display: none;
  }

  .mini-header {
    display: block;
  }
}
@media (min-width: 1200px) {
  .container {
    max-width: 1200px;
    padding: 0;
    margin: 0 auto;
  }
}
@media screen and (max-width: 1300px) {
  .container {
    padding: 0 20px;
  }
}
</style>
