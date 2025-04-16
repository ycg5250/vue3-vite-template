<template>
  <router-view />
</template>

<script setup>
// import { onMounted, ref } from "vue";
// import webSocketWorker from "./workers/webSocketWorker.js?worker";
// const wsWorker = new webSocketWorker()
// const count = ref(0)

import { ref, onMounted, onUnmounted } from 'vue';
import WebSocketManager from './utils/webSocketManager.js';

const message = ref(null);
const topics = `tick#1#0xE0554a476A092703abdB3Ef35c80e0D76d32939F#0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2#WETH#5m`
const favTopics = [
  "option#27#6p6xgHyF7AeE6TZkSmFsko444wqoP15icUSqi2jfGiPN#TRUMP",
  "option#12#0xECa41281c24451168a37211F0bc2b8645AF45092#TPT",
  "option#12#0x432665A9709593149DAb052FCda7E389122d98ae#TRUMP",
  "option#27#AD27ov5fVU2XzwsbvnFvb1JpCBaCB5dRXrczV9CqSVGb#REAL",
  "option#18#0xeB51D9A39AD5EEF215dC0Bf39a8821ff804A0F01#LGNS"
]

onMounted(() => {
  // WebSocketManager.init(); // 明确初始化
  // WebSocketManager.subscribe([topics]);
  WebSocketManager.subscribe(favTopics);
});

const off = WebSocketManager.onMessage((data) => {
  // console.log('Received message:', data);
  if (data.data.topic === topics) {
    console.log('Received message:', data);
    message.value = data;
  }
});

onUnmounted(() => {
  WebSocketManager.unsubscribe(topics);
  off(); // 清理消息监听器
});
</script>

<style lang="scss"></style>
