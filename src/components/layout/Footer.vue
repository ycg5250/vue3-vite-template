<template>
  <div class="FooterLayout">
    <footer class="content">
      <div class="follow-wrap">
        <img class="logo" src="../../assets/logo-w.png" />
        <div class="footer-follows">
          <div
            class="footer-follow"
            v-for="(item, index) in followList"
            :key="index"
            :class="['footer-follow-' + (index + 1)]"
            @click="openFollow(item)"
          ></div>
          <a
            href="mailto:service@tokenpocket.pro"
            class="footer-follow footer-follow-8"
            target="_blank"
          ></a>
        </div>
        <div class="copyright">© TP Global Ltd</div>
      </div>
      <div class="footer-wrap flex-1 d-flex flex-wrap jc-between">
        <div
          v-for="(item, index) in footerList"
          :key="index"
          class="footer-list"
        >
          <div
            class="footer-item"
            v-for="(child, cIndex) in item"
            :key="cIndex"
          >
            <div class="title">{{ child.title }}</div>
            <div class="footer-link-wrap">
              <div
                class="footer-link"
                v-for="(data, dataIndex) in child.data"
                :key="dataIndex"
                :class="{
                  width0: data.title === 'Transit Swap' && locale === 'zh',
                }"
              >
                <a
                  rel="nofollow"
                  class="pointer ft-14"
                  v-if="!(data.title === 'Transit Swap' && locale === 'zh')"
                  :href="data.url"
                  :target="data.local ? '_self' : '_blank'"
                  @click="footerUrl(data, $event)"
                  >{{ data.title }}</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
    <Modal v-if="show" @close="close" :url="url" />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useNavList } from '../../hooks/nav/useNavList';
const { footerList, followList } = useNavList();
import { useRouter } from 'vue-router';
const router = useRouter();
import { useI18n } from 'vue-i18n';
const { locale, t } = useI18n();
import Modal from '../layout/Modal.vue';

const show = ref(false);
const url = ref('');

const privacyPolicy = computed(() => {
  return locale.value === 'zh'
    ? '/privacy-zh/index.html'
    : '/privacy-en/index.html';
});

const terms = computed(() => {
  return locale.value === 'zh'
    ? '/terms-zh/index.html'
    : '/terms-en/index.html';
});

const openFollow = (item) => {
  if (item.isTelegram) {
    show.value = true;
    url.value = item.url;
  } else {
    window.open(item.url);
  }
};

const close = () => {
  show.value = false;
};
const footerUrl = (item) => {
  // el.preventDefault()
  // return false
  if (item.scrollTop) {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    return false;
  }
  if (item.curPage) {
    location.reload();
  } else {
    item.local ? localLink(item.url) : window.open(item.url);
  }
};

const localLink = (url) => {
  router.push(url);
};
</script>

<style lang="scss" scoped>
@for $i from 1 through 8 {
  .footer-follow-#{$i} {
    background: url(../../assets/footer/#{$i}.png)
      no-repeat
      100% /
      contain;
    cursor: pointer;
    &:hover {
      background: url(../../assets/footer/#{$i}-on.png)
        no-repeat
        100% /
        contain;
    }
  }
}
.FooterLayout {
  background: var(--footer-bg);
  .content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 80px 0 164px;
    display: flex;
    justify-content: space-between;
    .follow-wrap {
      .logo {
        width: 225px;
      }
      .footer-follows {
        margin: 32px 0 16px;
        max-width: 200px;
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        .footer-follow {
          width: 32px;
          height: 32px;
        }
      }
      .copyright {
        font-size: 12px;
        font-weight: 400;
        color: var(--copyright-color);
        line-height: 20px;
      }
    }
    .footer-wrap {
      margin-left: 131px;
      h3 {
        margin-top: 0;
        margin-bottom: 30px;
      }
      .footer-list {
        padding: 0 10px;
        &.lang-wrap {
          width: 30%;
          &:nth-child(n + 4) {
            margin-top: 20px;
          }
        }
        .footer-item {
          &:nth-child(n + 2) {
            margin-top: 30px;
          }
          .title {
            font-size: 14px;
            font-weight: 300;
            color: var(--footer-nav-title-color);
            line-height: 20px;
          }
          .footer-link-wrap {
            margin-top: 24px;
            .footer-link {
              a {
                display: inline-block;
                margin-bottom: 15px;
                font-size: 14px;
                font-weight: 300;
                color: var(--footer-nav-option-color);
                line-height: 18px;
                word-break: break-word;
                max-width: 100px;
              }
              a:hover {
                color: #2980fe;
              }
            }
          }
        }
      }
    }
  }
}

.footer-email {
  position: absolute;
  border: 1px solid #2980fe;
  border-radius: 4px;
  display: flex;
  align-items: center;
  height: 32px;
  font-size: 14px;
  input {
    outline: none;
    border: 0;
    color: #101010;
    width: 160px;
    height: 100%;
    margin: 0 0 0 10px;
    &::-webkit-input-placeholder {
      color: #b1b1b1;
    }

    &::-moz-placeholder {
      color: #b1b1b1;
    }

    &::-ms-placeholder {
      color: #b1b1b1;
    }
  }

  span {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 12px;
    font-weight: 400;
    width: 80px;
    height: 32px;
    line-height: 32px;
    color: #fff;
    background: #2980fe;
    position: relative;
    border-radius: 0 4px 4px 0;
  }
}

.email-icon-right {
  display: inline-block;
  position: relative;
  margin-left: 5px;
  width: 6px;
  height: 6px;

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 2px;
    width: 6px;
    height: 6px;
    border-top: 1px solid #fff;
    border-right: 1px solid #fff;
    transform: rotate(45deg);
  }
}

@media screen and (max-width: 1300px) {
  .FooterLayout {
    .content {
      padding: 80px 20px 164px;
    }
  }
}

@media screen and (max-width: 1200px) {
  .FooterLayout {
    .content {
      padding: 80px 20px 164px;
      flex-direction: column;
      .follow-wrap {
        .footer-follows {
          max-width: none;
        }
      }
      .footer-wrap {
        margin-left: 0;
        margin-top: 40px;
        .footer-list {
          padding: 0;
          .footer-item {
            .title {
              text-align: left;
            }
          }
        }
      }
    }
  }
}

// 移动端
@media screen and (max-width: 768px) {
  @for $i from 1 through 8 {
    .footer-follow-#{$i} {
      background: url(../../assets/footer/#{$i}.png)
        no-repeat
        100% /
        contain;
      cursor: pointer;
      &:hover {
        background: url(../../assets/footer/#{$i}.png)
          no-repeat
          100% /
          contain;
      }
    }
  }
  .FooterLayout {
    .content {
      padding: 68px 28px 60px;
      .follow-wrap {
        .logo {
          width: 199px;
        }
        .footer-follows {
          margin: 41px 0 21px;
        }
        .copyright {
          font-size: 13px;
        }
      }
      .footer-wrap {
        margin: 0;
        margin-top: 32px;
        .footer-list {
          padding: 0;
          width: 100%;
          margin-bottom: 12px;
          &.lang-wrap {
            width: 100%;
            &:nth-child(n + 4) {
              margin-top: 0;
            }
          }
          .footer-item {
            &:nth-child(n + 2) {
              margin-top: 12px;
            }
            .title {
              padding: 0;
              font-size: 14px;
            }
            .footer-link-wrap {
              margin-top: 12px;
              .footer-link {
                width: 100%;
                a {
                  margin-bottom: 8px;
                  line-height: 21px;
                }
              }
            }
          }
        }
      }
    }
  }
}

@media screen and (max-width: 575px) {
  .footer-link-wrap {
    display: flex;
    flex-wrap: wrap;
    .footer-link {
      width: 33%;
      &.width0 {
        width: 0;
      }
    }
  }

  .footer-list {
    margin-bottom: 10px;
  }

  .footer-link h3 {
    margin-bottom: 0px;
  }

  .footer-link a {
    margin-bottom: 0;
  }

  .footer-email {
    input {
      width: 200px;
    }
  }
}
</style>
