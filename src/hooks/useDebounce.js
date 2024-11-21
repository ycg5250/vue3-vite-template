import { ref } from 'vue';

export default function useDebounce() {
  const timer = ref(null);

  const debounce = (cb, delay = 150) => {
    if (timer.value) {
      clearTimeout(timer.value);
      timer.value = setTimeout(() => {
        cb();
      }, delay);
    } else {
      timer.value = setTimeout(() => {
        cb();
      }, delay);
    }
  };
  return { debounce }
}
