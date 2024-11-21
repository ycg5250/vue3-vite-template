<template>
  <div class="ref-point-view">
    <div class="title">{{ $t('REFPOINT.title_1') }}</div>
    <div class="desc-wrap">
      <div class="desc">{{ $t('REFPOINT.desc_1') }}</div>
      <div class="desc">{{ $t('REFPOINT.desc_2') }}</div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeRouteLeave } from 'vue-router';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
document.title = t('REFPOINT.title')
const html = document.querySelector('html')
if (html) {
  html.style.background = 'var(--bg-33)'
}
onBeforeRouteLeave((to, from) => {
  html.style.background = ''
})
</script>

<style lang="scss" scoped>
.ref-point-view {
  padding: 16px;
  .title {
    font-size: 15px;
    font-weight: 500;
    color: var(--color-1);
  }
  .desc {
    font-size: 14px;
    font-weight: 400;
    color: var(--color-7);
  }
  .desc-wrap {
    margin-top: 8px;
    :nth-child(2) {
      margin-top: 4px;
    }
  }
}
</style>
