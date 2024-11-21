import { computed, ref } from 'vue';
import { useStore } from 'vuex';

export default function useDarkImg() {
  const store = useStore();
  const isDarkMode = computed(() => {
    return store.state.isDarkMode
  });
  
  const darkModeImg = computed(() => {
    let imgSuffix = '';
    if (isDarkMode.value) {
      imgSuffix = '-dark';
    }
    return imgSuffix;
  });

  return { darkModeImg };
}
