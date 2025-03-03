<template>
  <div class="home">
    <Header />
    <main>
      <div class="tp-card-header">
        <div class="tp-card-video">
            <!-- loop -->
          <video
            ref="videoNode"
            id="video"
            :src="TPCardVideo"
            autoplay
            muted
            x5-video-player-fullscreen="true"
            x5-video-player-type="h5"
            playsinline="true"
            webkit-playsinline="true"
            style="max-height: 600px"
          ></video>
          <div class="cover"></div>
        </div>
        <div class="tp-card-content">
          <div class="title">{{ $t('HOME.TP_card') }}</div>
          <div class="desc">{{ $t('HOME.TP_card_desc') }}</div>
          <div class="button" @click="goToDownload">
            {{ $t('HOME.downloadToGet') }}
          </div>
          <img class="header-m" src="../assets/home/header-m.png" alt="" />
        </div>
      </div>
      <div class="map-view">
        <div class="map-title">{{ $t('HOME.regionsCovered') }}</div>
        <Map />
        <div class="country-list">
          <div
            class="country-item"
            v-for="(item, index) in countryList"
            :key="index"
          >
            {{ item.label }}
          </div>
        </div>
      </div>
      <div class="tp-card-download">
        <div class="tp-card-download-content">
          <div class="title" v-html="$t('HOME.sectionTitle_4_1')"></div>
          <div class="title" v-html="$t('HOME.sectionTitle_4_2')"></div>
          <div class="desc">{{ $t('HOME.sectionDesc_4_1') }}</div>
          <div class="button-list">
            <a
              class="button"
              :href="item.url"
              target="_blank"
              v-for="(item, index) in buttonList"
              :key="index"
            >
              <div class="button-left">
                <img :src="item.icon" alt="" />
              </div>
              <div class="button-right">
                <div class="text-1">{{ item.text_1 }}</div>
                <div class="text-2">{{ item.text_2 }}</div>
              </div>
            </a>
          </div>
          <div class="phone">
            <img :src="phoneImg" alt="" />
          </div>
        </div>
      </div>
      <div class="tp-card-FAQ">
        <div class="FAQ-title">{{ $t('HOME.FAQ.title') }}</div>
        <div class="FAQ-list">
          <FAQItem
            v-for="(item, index) in state.FAQList"
            :key="index"
            :FAQItem="item"
            @onFold="onFold"
          />
        </div>
        <div class="learn-more-wrap">
          <div class="learn-more" @click="onLearnMore">
            <span>{{ $t('HOME.learnMore') }}</span>
            <img :src="arrowImg" alt="">
          </div>
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script setup>
// @ is an alias to /src
import { computed, nextTick, onMounted, reactive, ref, watch } from 'vue';
import { useStore } from 'vuex';
const store = useStore();
import { useRouter } from 'vue-router';
const router = useRouter();
import { useI18n } from 'vue-i18n';
const { locale, t } = useI18n();
import { useNavUrl } from '../hooks/nav/useNavUrl';
const { isTokenPocketPro, TPCardRegisterUrl } = useNavUrl();
import useLangImg from '../hooks/useLangImg';
const { langImg } = useLangImg();
import useDarkImg from '../hooks/useDarkImg';
const { darkModeImg } = useDarkImg();

import { setMode } from '../utils';

import useCountDown from '../hooks/useCountDown';
import useDebounce from '../hooks/useDebounce';
import useThrottle from '../hooks/useThrottle';
import Header from '../components/layout/Header.vue';
import Footer from '../components/layout/Footer.vue';
import Map from '../components/common/Map.vue';
import FAQItem from '../components/common/FAQItem.vue';

import TPCard from '../assets/video/TP-card.mp4';
import { SUPPORT_COUNTRY_MAP } from '../utils/country';
import { TP_SERVER_DOMAIN } from '../utils/config';

const state = reactive({
  FAQList: [],
});

const videoNode = ref(null)

const isDarkMode = computed(() => {
  return store.state.isDarkMode;
});

const TPCardVideo = computed(() => {
  return new URL(`../assets/video/TP-card${darkModeImg.value}.mp4`, import.meta.url).href;
});

const learnMoreUrl = computed(() => {
  let langStr = 'en'
  if (locale.value === 'zh') {
    langStr = 'cn'
  }
  return `https://help.tokenpocket.pro/${langStr}/wallet-operation/tp-card`
})
const phoneImg = computed(() => {
  return new URL(`../assets/home/phone-${langImg.value}${darkModeImg.value}.png`, import.meta.url).href
})
const arrowImg = computed(() => {
  return new URL(`../assets/home/arrow${darkModeImg.value}.png`, import.meta.url).href
})

const section_1 = computed(() => {
  return {
    title: t('HOME.sectionTitle_1_1'),
    desc_1: t('HOME.sectionDesc_1_1'),
    img: new URL(`../assets/home/section-1-${langImg.value}${darkModeImg.value}.png`, import.meta.url).href,
    img_m: new URL(`../assets/home/section-1-m-${langImg.value}${darkModeImg.value}.png`, import.meta.url).href,
  };
});
const section_2 = computed(() => {
  return {
    title: t('HOME.sectionTitle_2_1'),
    desc_1: t('HOME.sectionDesc_2_1'),
    desc_2: t('HOME.sectionDesc_2_2'),
    img: new URL(`../assets/home/section-2${darkModeImg.value}.png`, import.meta.url).href,
    img_m: new URL(`../assets/home/section-2-m${darkModeImg.value}.png`, import.meta.url).href,
  };
});
const section_3 = computed(() => {
  return {
    title: t('HOME.sectionTitle_3_1'),
    title_2: t('HOME.sectionTitle_3_2'),
    desc_1: t('HOME.sectionDesc_3_1'),
    desc_2: t('HOME.sectionDesc_3_2'),
    img: new URL(`../assets/home/section-3${darkModeImg.value}.png`, import.meta.url).href,
    img_m: new URL(`../assets/home/section-3-m${darkModeImg.value}.png`, import.meta.url).href,
  };
});
const buttonList = computed(() => {
  return [
    {
      icon: new URL(`../assets/home/Apple${darkModeImg.value}.png`, import.meta.url).href,
      text_1: t('HOME.GET_IT_ON'),
      text_2: t('HOME.AppStore'),
      url: 'https://apps.apple.com/hk/app/tp-global-wallet/id6444625622',
    },
    {
      icon: new URL(`../assets/home/Google.png`, import.meta.url).href,
      text_1: t('HOME.GET_IT_ON'),
      text_2: t('HOME.GooglePlay'),
      url: 'https://play.google.com/store/apps/details?id=vip.mytokenpocket',
    },
    {
      icon: new URL(`../assets/home/Android.png`, import.meta.url).href,
      text_1: t('HOME.download'),
      text_2: t('HOME.AndroidAPK'),
      url: 'https://download.tpstatic.net/apk/TokenPocket-pro.apk',
    },
  ];
});
const FAQList = computed(() => {
  return [
    {
      question: t('HOME.FAQ.question_1_1'),
      descList: [
        {
          text: t('HOME.FAQ.answer_1_1'),
        },
      ],
    },
    {
      question: t('HOME.FAQ.question_2_1'),
      descList: [
        {
          text: t('HOME.FAQ.answer_2_1'),
          url: TPCardRegisterUrl.value,
        },
      ],
    },
    {
      question: t('HOME.FAQ.question_3_1'),
      descList: [
        {
          text: t('HOME.FAQ.answer_3_1'),
        },
        {
          text: t('HOME.FAQ.answer_3_2'),
          part: true, // 段落
          part_start: true,
        },
        {
          text: t('HOME.FAQ.answer_3_3'),
          part: true,
          part_end: true,
        },
        {
          text: t('HOME.FAQ.answer_3_4'),
        },
      ],
    },
    {
      question: t('HOME.FAQ.question_4_1'),
      descList: [
        {
          text: t('HOME.FAQ.answer_4_1'),
          // part_start: true,
        },
        {
          text: t('HOME.FAQ.answer_4_2'),
          part_start: true,
        },
        {
          text: t('HOME.FAQ.answer_4_3'),
          part_start: true,
        },
        {
          text: t('HOME.FAQ.answer_4_4'),
          part_start: true,
        },
      ],
    },
    {
      question: t('HOME.FAQ.question_5_1'),
      descList: [
        {
          text: t('HOME.FAQ.answer_5_1'),
        },
      ],
    },
    {
      question: t('HOME.FAQ.question_6_1'),
      descList: [
        {
          text: t('HOME.FAQ.answer_6_1'),
        },
      ],
    },
    {
      question: t('HOME.FAQ.question_7_1'),
      descList: [
        {
          text: t('HOME.FAQ.answer_7_1'),
        },
      ],
    },
    // {
    //   question: t('HOME.FAQ.question_8_1'),
    //   descList: [
    //     {
    //       text: t('HOME.FAQ.answer_8_1'),
    //     },
    //     {
    //       text: t('HOME.FAQ.answer_8_2'),
    //     },
    //   ],
    // },
    // {
    //   question: t('HOME.FAQ.question_9_1'),
    //   descList: [
    //     {
    //       text: t('HOME.FAQ.answer_9_1'),
    //     },
    //     {
    //       text: t('HOME.FAQ.answer_9_2'),
    //     },
    //   ],
    // },
    {
      question: t('HOME.FAQ.question_10_1'),
      descList: [
        {
          text: t('HOME.FAQ.answer_10_1'),
        },
        {
          text: t('HOME.FAQ.answer_10_2'),
          part_start: true,
        },
        {
          text: t('HOME.FAQ.answer_10_3'),
          part_start: true,
        },
        {
          text: t('HOME.FAQ.answer_10_4'),
          part_start: true,
        },
      ],
    },
  ];
});

const countryList = computed(() => {
  let list = []
  for (const key in SUPPORT_COUNTRY_MAP) {
    let country = SUPPORT_COUNTRY_MAP[key];
    country.label = t(`COUNTRY.${country.code}`);
    list.push(country);
  }
  return list
})

onMounted(() => {
  nextTick(() => {
    if (videoNode) {
      // console.log('videoNode', videoNode.value);
      videoNode.value.style.outline = 'none'
    }
  })
})

watch(
  locale,
  (newVal, oldVal) => {
    state.FAQList = FAQList.value;
  },
  { immediate: true }
);

const onLearnMore = () => {
  window.open(learnMoreUrl.value, '_blank')
}

const goToDownload = () => {
  if (isTokenPocketPro.value) {
    window.open(`https://tokenpocket.pro/${locale.value}/download/app`);
  } else {
    window.open(`https://tpwallet.io/${locale.value}/download/app`);
  }
};

const onFold = (item) => {
  // console.log('home-view', item);
  state.FAQList = [...state.FAQList];
  item.fold = !item.fold;
};

const changMode = () => {
  // setDarkMode(!isDarkMode.value)
  setMode(!isDarkMode.value);
  store.commit('setDarkMode', !isDarkMode.value);
  console.log('isDarkMode', isDarkMode.value);
};

function setDarkMode(payload) {
  store.commit('setDarkMode', payload);
}
</script>

<style lang="scss" scoped>
.home {
  // background: #fff;
  main {
    margin-top: 60px;
    .tp-card-header {
      position: relative;
      width: 100%;
      // background: var(--bg-1);
      .tp-card-video {
        width: 100%;
        font-size: 0;
        position: relative;
        #video {
          width: 100%;
          min-height: 450px;
          max-height: 600px;
          border: none;
        }
        .cover {
          position: absolute;
          z-index: 10;
          left: 0;
          top: 0;
          border: 2px solid;
          border-color: var(--bg-1);
          width: 100%;
          height: 100%;
          pointer-events: none;
        }
      }
      .tp-card-content {
        position: absolute;
        max-width: 1200px;
        width: 100%;
        left: 50%;
        top: 138px;
        transform: translateX(-50%);
        .title {
          font-size: 96px;
          font-weight: 600;
          color: var(--color-19);
        }
        .desc {
          max-width: 420px;
          margin-top: 10px;
          font-size: 24px;
          font-weight: 400;
          color: var(--color-20);
        }
        .button {
          margin-top: 40px;
          height: 60px;
          width: fit-content;
          background: #2980fe;
          border-radius: 44px;
          font-size: 20px;
          font-weight: 500;
          text-align: center;
          color: #ffffff;
          line-height: 60px;
          padding: 0 40px;
          cursor: pointer;
        }
        .header-m {
          display: none;
        }
      }
    }
    .section {
      // background: #2980fe;
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
          font-size: 22px;
          font-weight: 400;
          color: var(--color-20);
        }
      }
      .section-right {
        margin-left: 58px;
        display: flex;
        img {
          width: 672px;
          height: 540px;
        }
      }
    }
    :deep(.section-1) {
      margin-top: 50px;
    }  
    :deep(.section-2) {
      .section-left {
        order: 2;
        margin: 0 70px;
      }
      .section-right {
        order: 1;
        margin-left: 0;
        // margin-right: 58px;
        margin-right: 0;
        img {
          width: 672px;
          height: 540px;
        }
      }
    }
    :deep(.section-3) {
      .section-right {
        img {
          width: 672px;
          height: 540px;
        }
      }
    }
    .map-view {
      margin-top: 120px;
      .map-title {
        margin-bottom: 72px;
        font-size: 40px;
        font-weight: 600;
        text-align: center;
        color: var(--color-19);
      }
      .country-list {
        display: none;
      }
    }
    .tp-card-download {
      margin-top: 300px;
      .tp-card-download-content {
        position: relative;
        max-width: 1200px;
        margin: 0 auto;
        background: var(--bg-31);
        border-radius: 32px;
        padding: 48px 88px;
        .title {
          font-size: 56px;
          font-weight: 700;
          color: var(--color-4);
          max-width: 560px;
          span {
            color: #2980fe;
          }
        }
        .desc {
          margin-top: 24px;
          font-size: 24px;
          font-weight: 400;
          color: var(--color-20);
        }
        .button-list {
          margin-top: 56px;
          display: flex;
          gap: 0 16px;
          .button {
            width: fit-content;
            height: 54px;
            background: var(--bg-3);
            border-radius: 7px;
            display: flex;
            align-items: center;
            padding: 5px 16px;
            cursor: pointer;
            .button-left {
              display: flex;
              img {
                width: 35px;
                height: 34px;
              }
            }
            .button-right {
              margin-left: 10px;
              .text-1 {
                font-size: 10px;
                font-weight: 600;
                color: var(--color-19);
              }
              .text-2 {
                font-size: 14px;
                font-weight: 500;
                color: var(--color-19);
              }
            }
          }
        }
        .phone {
          position: absolute;
          bottom: 0;
          right: 95px;
          font-size: 0;
          img {
            width: 360px;
            // height: 611px;
            height: auto;
          }
        }
      }
    }
    .tp-card-FAQ {
      margin: 200px 0 110px;
      .FAQ-title {
        font-size: 40px;
        font-weight: 600;
        text-align: center;
        color: var(--color-19);
      }
      .FAQ-list {
        max-width: 742px;
        margin: 92px auto 0;
        display: flex;
        flex-direction: column;
        gap: 32px 0;
      }
      .learn-more-wrap {
        .learn-more {
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 742px;
          margin: 24px auto 0;
          cursor: pointer;
          span {
            font-size: 22px;
            font-weight: 600;
            color: var(--color-19);
          }
          img {
            width: 15px;
            height: 15px;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 1200px) {
  .home {
    main {
      .tp-card-header {
        .tp-card-content {
          padding: 0 28px;
        }
      }
      .section {
        padding: 0 28px;
      }
      .map-view {
        .svg-map {
          display: none;
        }
        .country-list {
          padding: 0 28px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px 20px;
          .country-item {
            font-size: 12px;
            font-weight: 500;
            color: var(--color-20);
          }
        }
      }
      .tp-card-download {
        padding: 0 28px;
      }
    }
  }
}
@media screen and (max-width: 1080px) {
  .home {
    main {
      .section {
        // padding: 0;
        max-width: none;
        flex-direction: column;
      }
      .tp-card-download {
        padding: 0 28px;
        .tp-card-download-content {
          .phone {
            display: none;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 767px) {
  .home {
    main {
      .tp-card-header {
        padding-top: 50px;
        background: var(--home-bg-img) no-repeat;
        background-size: 100% auto;
        .tp-card-video {
          display: none;
        }
        .tp-card-content {
          // padding: 0 28px;
          max-width: none;
          position: static;
          padding: 0;
          transform: translateX(0);
          display: flex;
          flex-direction: column;
          align-items: center;
          .title {
            font-size: 52px;
          }
          .desc {
            margin-top: 0;
            font-size: 16px;
            max-width: 88%;
            margin: 0 auto;
            text-align: center;
          }
          .button {
            margin-top: 16px;
            border-radius: 22px;
            height: 44px;
            line-height: 44px;
            font-size: 13px;
            padding: 0 20px;
          }
          .header-m {
            display: block;
            width: 100%;
            height: auto;
          }
        }
      }
      .section {
        padding: 0;
        max-width: none;
        flex-direction: column;
        align-items: flex-start;
        .section-right {
          img {
            width: 100%;
            height: auto;
          }
        }
      }
      :deep(.section-1) {
        margin-top: 50px;
      } 
      :deep(.section-2) {
        margin-top: 100px;
        .section-left {
          order: 1;
          margin: 0;
        }
        .section-right {
          order: 2;
          margin: 0 0 0px;
          img {
            width: 100%;
            height: auto;
          }
        }
      }
      :deep(.section-3) {
        margin-top: 24px;
        .section-right {
          margin: 40px 0 0;
          img {
            width: 100%;
            height: auto;
          }
        }
      }
      .map-view {
        margin-top: 24px;
        .map-title {
          font-size: 28px;
          padding: 0 28px;
          margin-bottom: 28px;
          text-align: left;
        }
      }
      .tp-card-download {
        // padding: 0 28px;
        margin-top: 120px;
        .tp-card-download-content {
          padding: 48px 32px 64px;
          .title {
            font-size: 28px;
          }
          .desc {
            margin-top: 15px;
            font-size: 16px;
          }
          .button-list {
            flex-wrap: wrap;
            margin-top: 24px;
            gap: 16px 16px;
            .button {
              height: 48px;
              padding: 3px 12px;
              .button-left {
                img {
                  width: 28px;
                  height: 28px;
                }
              }
              .button-right {
                margin-left: 8px;
                .text-1 {
                  font-size: 6px;
                }
                .text-2 {
                  font-size: 11px;
                }
              }
            }
          }
        }
      }
      .tp-card-FAQ {
        padding: 0 28px;
        margin: 100px 0 60px;
        .FAQ-title {
          font-size: 28px;
        }
        .FAQ-list {
          max-width: none;
          margin: 40px auto 0;
          gap: 16px 0;
        }

        .learn-more-wrap {
          .learn-more {
            span  {
              font-size: 15px;
            }
            img {
              width: 10px;
              height: 10px;
            }
          }
        }
      }
    }
  }
}
</style>
