<template>
  <div class="switch-wrap">
    <span
      class="weui-switch"
      :class="{ 'weui-switch-on': checked, big: size === 'big' }"
      :value="value"
      @click.stop="toggle"
    ></span>
  </div>
</template>

<script setup>
//   export default {
//     name: 'Switcher',
//     props: {
//       value: {
//         type: Boolean
//       },
//       size: {
//         type: String
//       }
//     },
//     data() {
//       return {
//         checked: this.value
//       }
//     },
//     watch: {
//       value(val) {
//         this.checked = val
//       }
//     },
//     methods: {
//       toggle() {
//         this.checked = !this.checked;
//         this.$emit('switch', !this.checked);
//       }
//     }
//   }
//
import { ref, watch } from 'vue';
const emit = defineEmits(['onFold']);
const props = defineProps({
  value: {
    type: Boolean,
  },
  size: {
    type: String,
  },
});
const checked = ref(props.value);

watch(
  () => props.value,
  (n, o) => {
    checked.value = n;
  },
  { immediate: true }
);
const toggle = () => {
  checked.value = !checked.value;
  emit('switch', checked.value);
};
</script>

<style lang="scss" scoped>
.weui-switch {
  display: block;
  position: relative;
  width: 28px;
  height: 16px;
  border: 1px solid var(--switch-border);
  outline: 0;
  border-radius: 8px;
  box-sizing: border-box;
  background-color: var(--switch-bg);
  transition: background-color 0.1s, border 0.1s;
  cursor: pointer;
}
.weui-switch:before {
  content: ' ';
  position: absolute;
  top: 0;
  left: 0;
  width: 26px;
  height: 14px;
  border-radius: 15px;
  background-color: var(--switch-before-bg);
  transition: transform 0.35s cubic-bezier(0.45, 1, 0.4, 1);
}
.weui-switch:after {
  content: ' ';
  position: absolute;
  top: 0;
  left: 0;
  width: 14px;
  height: 14px;
  border-radius: 7px;
  background-color: #ffffff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
  transition: transform 0.35s cubic-bezier(0.4, 0.4, 0.25, 1.35);
}
.weui-switch-on {
  border-color: var(--switch-on);
  background-color: var(--switch-on);
}
.weui-switch-on:before {
  border-color: var(--switch-on);
  background-color: var(--switch-on);
}
.weui-switch-on:after {
  transform: translateX(12px);
}

.big {
  &.weui-switch {
    width: 65px;
    height: 36px;
    border-radius: 18px;
  }
  &.weui-switch:before {
    width: 63px;
    height: 34px;
    border-radius: 32.5px;
  }
  &.weui-switch:after {
    width: 34px;
    height: 34px;
    border-radius: 17px;
  }
  &.weui-switch-on:after {
    transform: translateX(29px);
  }
}

@media screen and (max-width: 680px) {
  .big {
    &.weui-switch {
      width: 50px;
      height: 28px;
      border-radius: 14px;
    }
    &.weui-switch:before {
      width: 48px;
      height: 26px;
      border-radius: 25px;
    }
    &.weui-switch:after {
      width: 26px;
      height: 26px;
      border-radius: 13px;
    }
    &.weui-switch-on:after {
      transform: translateX(22px);
    }
  }
}
</style>
