<template>
  <div class="FAQ-item">
    <div class="FAQ-question" @click="$emit('onFold', FAQItem)">
      <span>{{ FAQItem.question }}</span>
      <img v-if="FAQItem.fold" :src="unfoldImg" alt="" />
      <img v-else :src="foldImg" alt="" />
    </div>
    <div class="FAQ-desc-list" v-if="FAQItem.fold">
      <div
        class="desc-item"
        v-for="(item, index) in FAQItem.descList"
        :key="index"
      >
        <div
          class="text"
          :class="{
            'text-indent': item.part,
            part_start: item.part_start,
            part_end: item.part_end,
          }"
        >
          {{ item.text }}
          <a v-if="item.url" :href="item.url" target="_blank">{{
            $t('HOME.FAQ.checkDetail')
          }}</a>
        </div>
      </div>
    </div>
    <div class="line"></div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import useDarkImg from "../../hooks/useDarkImg";
const { darkModeImg } = useDarkImg()

const emit = defineEmits(['onFold']);
const props = defineProps({
  FAQItem: {
    type: Object,
  },
});

const foldImg = computed(() => {
  return new URL(`../../assets/home/fold${darkModeImg.value}.png`, import.meta.url).href
})
const unfoldImg = computed(() => {
  return new URL(`../../assets/home/unfold${darkModeImg.value}.png`, import.meta.url).href
})
// const onFold = () => {
//   emit('onFold', props.FAQItem);
// };
</script>

<style lang="scss" scoped>
.FAQ-item {
  .FAQ-question {
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    span {
      font-size: 22px;
      font-weight: 500;
      color: var(--color-19);
    }
    img {
      margin-left: 50px;
      width: 15px;
      height: 15px;
    }
  }
  .FAQ-desc-list {
    margin-top: 24px;
    .desc-item {
      .text {
        font-size: 17px;
        font-weight: 400;
        color: var(--color-21);
        line-height: 22px;
        a {
          color: #2980fe;
        }
      }
      .text-indent {
        text-indent: 1rem;
      }
      .part_start {
        margin-top: 6px;
      }
      .part_end {
        margin-bottom: 6px;
      }
    }
  }
  .line {
    margin-top: 32px;
    background: #e1e1e1;
    height: 1px;
  }
}
@media screen and (max-width: 767px) {
  .FAQ-item {
    .FAQ-question {
      span {
        font-size: 15px;
      }
      img {
        width: 10px;
        height: 10px;
      }
    }
    .FAQ-desc-list {
      margin-top: 12px;
      .desc-item {
        .text {
          font-size: 13px;
          line-height: 16px;
        }
      }
    }
    .line {
      margin-top: 16px;
    }
  }
}
</style>
