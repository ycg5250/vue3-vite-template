import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
/** 根据语言返回对应语言图片后缀 */
export default function useLangImg() {
  const { locale } = useI18n();

  const langImg = computed(() => {
    let lang = 'en';
    if (locale.value === 'zh') {
      lang = 'zh';
    }
    return lang;
  });

  return { langImg };
}
