<template>
  <router-view />
</template>

<script setup>
import { onMounted, ref } from "vue";
import MyWorker from "./workers/worker.js?worker";
const worker = new MyWorker()
const count = ref(0)

// 监听消息
worker.onmessage = e => {
  if (e.data === "ended") {
    worker.terminate()
  } else {
    count.value = e.data
  }
}

onMounted(() => {
  worker.postMessage("start")
})

</script>


<style lang="scss">
</style>
