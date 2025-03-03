<template>
  <div class="vips-view">
    <div class="introduce">
      <div class="text">{{ $t('VIP.introduce_1') }}</div>
      <div class="text">{{ $t('VIP.introduce_2') }}</div>
      <div class="text">{{ $t('VIP.introduce_3') }}</div>
    </div>
    <div class="user-level">
      <div class="title">{{ $t('VIP.text_1') }}</div>
      <div class="vip-table" v-if="tableData.length > 1">
        <div class="table-list">
          <div
            class="table-item"
            v-for="(item, index) in tableData"
            :key="index"
          >
            <span v-if="item.vip">{{ item.vip }}</span>
            <span v-if="item.icon">
              <img :src="item.icon" alt="" />
            </span>
            <span>{{ item.points }}</span>
            <span>{{ item.fee }}</span>
            <span>{{ item.referral }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';
import { useI18n } from 'vue-i18n';
const { locale, t } = useI18n();
import { TP_SERVER_DOMAIN } from '../utils/config';

const tableData = ref([
  {
    vip: 'VIP',
    points: t('VIP.text_2'),
    fee: t('VIP.text_3'),
    referral: t('VIP.text_4'),
  },
]);

document.title = t('VIP.title')

const html = document.querySelector('html')
if (html) {
  html.style.background = 'var(--bg-33)'
}
onBeforeRouteLeave((to, from) => {
  html.style.background = ''
})

const fetchVipRuleList = async () => {
  try {
    const response = await fetch(`${TP_SERVER_DOMAIN}/v1/tp_card/config`);
    const res = await response.json();
    // console.log('fetchVipRuleList', res);
    if (res.result === 0 && res.data && res.data.vip_rule_list) {
      res.data.vip_rule_list.forEach(item => {
        item.points = item.points.toLocaleString()
        item.fee = item.fee / 100 + '%'
        item.referral = item.referral / 100 + '%'
      });
      tableData.value = [ ...tableData.value, ...res.data.vip_rule_list ]
    }
  } catch (error) {
    console.log(error);
  }
};

fetchVipRuleList();
</script>

<style lang="scss" scoped>
.vips-view {
  padding: 16px;
  .title {
    font-size: 14px;
    font-weight: 500;
    color: var(--color-1);
  }
  .text {
    font-size: 13px;
    font-weight: 400;
    color: var(--color-7);
    line-height: 20px;
  }
  .introduce {
  }
  .user-level {
    margin-top: 20px;
    .vip-table {
      margin-top: 12px;
      .table-list {
        border: 1px solid var(--border-14);
        border-radius: 8px;
        .table-item {
          display: flex;
          align-items: center;
          span {
            height: 45px;
            line-height: 45px;
            font-size: 13px;
            font-weight: 500;
            color: var(--color-1);
            flex: 1;
            text-align: center;
            border-right: 1px solid var(--border-14);
            border-bottom: 1px solid var(--border-14);
          }
          img {
            width: 20px;
            height: 20px;
          }
          :nth-child(1) {
            background: var(--bg-32);
            display: flex;
            align-items: center;
            justify-content: center;
          }
          :nth-child(4) {
            border-right: none;
          }
          &:nth-child(1) {
            background: var(--bg-32);
            border-radius: 8px 8px 0 0;
            :nth-child(1) {
              border-radius: 8px 0 0 0;
            }
          }
          &:nth-child(6) {
            span {
              border-bottom: none;
              border-radius: 0 0 0 8px;
            }
          }
        }
      }
    }
  }
  .premium {
    margin-top: 20px;
  }
}
</style>
