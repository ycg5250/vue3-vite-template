<template>
  <div class="section">
    <div class="section-left" v-if="section">
      <div class="title">{{ section.title }}</div>
      <div class="title" v-if="section.title_2">{{ section.title_2 }}</div>
      <div class="desc" v-if="section.desc_1">{{ section.desc_1 }}</div>
      <div class="desc desc-2" v-if="section.desc_2">{{ section.desc_2 }}</div>
    </div>
    <div class="section-right" v-if="section">
      <picture>
        <source :srcset="section.img_m" media="(max-width: 767px)" />
        <img :src="section.img" alt="" />
      </picture>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
const props = defineProps({
  section: {
    type: Object,
  },
});
// onMounted(() => {
//   console.log('props', props);
// });
</script>

<style lang="scss" scoped>
.section {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .section-left {
    .title {
      font-size: 46px;
      font-weight: 600;
      color: var(--color-19);
    }
    .desc {
      margin-top: 24px;
      font-size: 18px;
      font-weight: 400;
      color: var(--color-20);
      line-height: 24px;
    }
    .desc-2 {
      margin-top: 0;
    }
  }
  .section-right {
    margin-left: 58px;
    display: flex;
    picture {
      font-size: 0;
    }
    img {
      width: 672px;
      height: 540px;
    }
  }
}
@media screen and (max-width: 1080px) {
  .section {
    .section-right {
      margin: 26px 0 0;
    }
  }
}
@media screen and (max-width: 767px) {
  .section {
    padding: 0;
    .section-left {
      padding: 0 28px;
      .title {
        font-size: 28px;
      }
      .desc {
        margin-top: 16px;
        font-size: 15px;
        line-height: 20px;
      }
      .desc-2 {
        margin-top: 0;
      }
    }
    .section-right {
      margin: 80px 0 0;
      img {
        width: 100%;
        height: auto;
      }
    }
  }
}
</style>
