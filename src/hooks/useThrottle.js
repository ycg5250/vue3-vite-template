import { ref } from 'vue';

export default function useThrottle() {
  const isThrottle = ref(true);
  const throttle = (cb, delay) => {
    if (!isThrottle.value) {
      return;
    }
    isThrottle.value = false;
    setTimeout(() => {
      cb();
      isThrottle.value = true;
    }, delay);
  };

  return { throttle }
}
