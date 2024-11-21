import { ref } from 'vue';

/** 倒计时hook */
export default function useCountDown() {
  const countNum = ref(0);
  const countInterval = ref(null);
  
  const startCountDown = (num) => {
    countNum.value = Number(num);
    countInterval.value = setInterval(() => {
      if (countNum.value === 0) {
        clearCountDown(countNum.value);
        countNum.value = null;
        return;
      }
      countNum.value--;
    }, 1000);
  };

  const clearCountDown = () => {
    if (countInterval.value) {
      clearInterval(countInterval.value);
    }
  };

  return { countNum, startCountDown, clearCountDown };
}
