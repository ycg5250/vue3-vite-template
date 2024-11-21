import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';

export function useNavUrl() {
  const { locale } = useI18n();
  const store = useStore();
  const isTokenPocketPro = computed(() => {
    if (
      window.location.hostname === 'card.tokenpocket.pro'
    ) {
      return true;
    } else {
      return false;
    }
  });
  const theme = computed(() => {
    if (store.state.isDarkMode) {
      return 'dark'
    } else {
      return 'light'
    }
  });
  const isZH = computed(() => {
    if (locale.value === 'zh') {
      return true;
    } else {
      return false;
    }
  });

  const homeUrl = computed(() => {
    if (isTokenPocketPro.value) {
      return `https://tokenpocket.pro/${locale.value}?theme=${theme.value}`;
    } else {
      return `https://tpwallet.io/${locale.value}?theme=${theme.value}`;
    }
  });

  const extensionUrl = computed(() => {
    if (isTokenPocketPro.value) {
      if (isZH.value) {
        return 'https://extension.tokenpocket.pro/?locale=zh';
      } else {
        return 'https://extension.tokenpocket.pro/?locale=en';
      }
    } else {
      if (isZH.value) {
        return 'https://extension.tpwallet.io/?locale=zh';
      } else {
        return 'https://extension.tpwallet.io/?locale=en';
      }
    }
  });
  const dappUrl = computed(() => {
    if (isTokenPocketPro.value) {
      return `https://tokenpocket.pro/${locale.value}/submit/dapp?theme=${theme.value}`;
    } else {
      return `https://tpwallet.io/${locale.value}/submit/dapp?theme=${theme.value}`;
    }
  });
  const tokenUrl = computed(() => {
    if (isTokenPocketPro.value) {
      return `https://tokenpocket.pro/${locale.value}/submit/token`;
    } else {
      return `https://tpwallet.io/${locale.value}/submit/token`;
    }
  });
  const nftUrl = computed(() => {
    if (isTokenPocketPro.value) {
      return `https://tokenpocket.pro/${locale.value}/submit/nft`;
    } else {
      return `https://tpwallet.io/${locale.value}/submit/nft`;
    }
  });
  const recruitingUrl = computed(() => {
    if (isTokenPocketPro.value) {
      return `https://tokenpocket.pro/${locale.value}/recruiting?theme=${theme.value}`;
    } else {
      return `https://tpwallet.io/${locale.value}/recruiting?theme=${theme.value}`;
    }
  });
  const aboutUrl = computed(() => {
    if (isTokenPocketPro.value) {
      return `https://tokenpocket.pro/${locale.value}/about?theme=${theme.value}`;
    } else {
      return `https://tpwallet.io/${locale.value}/about?theme=${theme.value}`;
    }
  });
  const developerUrl = computed(() => {
    if (isZH.value) {
      return 'https://help.tokenpocket.pro/developer-cn/';
    } else {
      return 'https://help.tokenpocket.pro/developer-en/';
    }
  });
  const helpUrl = computed(() => {
    if (isTokenPocketPro.value) {
      if (isZH.value) {
        return 'https://help.tokenpocket.pro/cn/';
      } else {
        return 'https://help.tokenpocket.pro/en/';
      }
    } else {
      if (isZH.value) {
        return 'https://help.tpwallet.io/cn/';
      } else {
        return 'https://help.tpwallet.io/en/';
      }
    }
  });
  const desktopUrl = computed(() => {
    if (isTokenPocketPro.value) {
      return `https://tokenpocket.pro/${locale.value}/download/pc`;
    } else {
      return `https://tpwallet.io/${locale.value}/download/pc`;
    }
  });
  const approvalUrl = computed(() => {
    if (isTokenPocketPro.value) {
      if (isZH.value) {
        return 'https://approval.tokenpocket.pro/?locale=zh';
      } else {
        return 'https://approval.tokenpocket.pro/?locale=en';
      }
    } else {
      if (isZH.value) {
        return 'https://approval.tptool.pro/?locale=zh';
      } else {
        return 'https://approval.tptool.pro/?locale=en';
      }
    }
  });
  const batchSenderUrl = computed(() => {
    if (isTokenPocketPro.value) {
      if (isZH.value) {
        return 'https://batchsender.tokenpocket.pro/?locale=zh';
      } else {
        return 'https://batchsender.tokenpocket.pro/?locale=en';
      }
    } else {
      if (isZH.value) {
        return 'https://batchsender.tptool.pro/?locale=zh';
      } else {
        return 'https://batchsender.tptool.pro/?locale=en';
      }
    }
  });
  const tokenSecurityUrl = computed(() => {
    if (isTokenPocketPro.value) {
      if (isZH.value) {
        return 'https://tokensecurity.tokenpocket.pro/?locale=zh';
      } else {
        return 'https://tokensecurity.tokenpocket.pro/?locale=en';
      }
    } else {
      if (isZH.value) {
        return 'https://tokensecurity.tptool.pro/?locale=zh';
      } else {
        return 'https://tokensecurity.tptool.pro/?locale=en';
      }
    }
  });
  const contactUsUrl = computed(() => {
    if (isTokenPocketPro.value) {
      if (isZH.value) {
        return 'https://help.tokenpocket.pro/cn/contact-us/contact-methods';
      } else {
        return 'https://help.tokenpocket.pro/en/contact-us/contact-methods';
      }
    } else {
      if (isZH.value) {
        return 'https://help.tpwallet.io/cn/contact-us/contact-methods';
      } else {
        return 'https://help.tpwallet.io/en/contact-us/contact-methods';
      }
    }
  });
  const rexUrl = computed(() => {
    if (isTokenPocketPro.value) {
      if (isZH.value) {
        return 'https://rex.tokenpocket.pro/?locale=zh';
      } else {
        return 'https://rex.tokenpocket.pro/?locale=en';
      }
    } else {
      if (isZH.value) {
        return 'https://rex.tptool.pro/?locale=zh';
      } else {
        return 'https://rex.tptool.pro/?locale=en';
      }
    }
  });
  const joinUsUrl = computed(() => {
    if (!isTokenPocketPro.value) {
      if (isZH.value) {
        return 'https://help.tokenpocket.pro/cn/contact-us/joinus';
      } else {
        return 'https://help.tokenpocket.pro/en/contact-us/Joinus';
      }
    } else {
      if (isZH.value) {
        return 'https://help.tpwallet.io/cn/contact-us/joinus';
      } else {
        return 'https://help.tpwallet.io/en/contact-us/Joinus';
      }
    }
  });
  const stakeVaultUrl = computed(() => {
    if (isTokenPocketPro.value) {
      if (isZH.value) {
        return 'https://dapp.tokenpocket.pro/StakeVault/index.html?locale=zh#/';
      } else {
        return 'https://dapp.tokenpocket.pro/StakeVault/index.html?locale=en#/';
      }
    } else {
      if (isZH.value) {
        return 'https://dapp.tptool.pro/StakeVault/index.html?locale=zh#/';
      } else {
        return 'https://dapp.tptool.pro/StakeVault/index.html?locale=en#/';
      }
    }
  });
  const verifyVersionUrl = computed(() => {
    if (isTokenPocketPro.value) {
      return `https://verify.tokenpocket.pro/?locale=${locale.value}&theme=${theme.value}#/`;
    } else {
      return `https://verify.tpwallet.io/?locale=${locale.value}&theme=${theme.value}#/`;
    }
  });
  const fiveDegreesUrl = computed(() => {
    if (isZH.value) {
      return 'https://www.5degrees.io/?locale=zh#/';
    } else {
      return 'https://www.5degrees.io/?locale=en#/';
    }
  });
  const keypalUrl = computed(() => {
    if (isZH.value) {
      return 'https://www.keypal.pro/?locale=zh#/';
    } else {
      return 'https://www.keypal.pro/?locale=en#/';
    }
  });
  const transitFinanceUrl = computed(() => {
    return `https://transit.finance/?locael=${locale.value}&theme=${theme.value}`;
  });
  const transitSwapUrl = computed(() => {
    return `https://swap.transit.finance/?from=tp&locale=${locale.value}&theme=${theme.value}#/`;
  });
  const transitSwapMarkUrl = computed(() => {
    return `https://swap.transit.finance/?from=tp&locale=${locale.value}&theme=${theme.value}#/market`;
  });
  const keyUrl = computed(() => {
    if (isTokenPocketPro.value) {
      return `https://key.tokenpocket.pro/?locale=${locale.value}#/`;
    } else {
      return `https://key.tptool.pro/?locale=${locale.value}#/`;
    }
  });
  const tokenProfileUrl = computed(() => {
    if (isTokenPocketPro.value) {
      return `https://profile.tokenpocket.pro/?locale=${locale.value}#/`;
    } else {
      return `https://profile.tptool.pro/?locale=${locale.value}#/`;
    }
  });
  const inscriptionUrl = computed(() => {
    if (isTokenPocketPro.value) {
      return `https://tp-lab.tokenpocket.pro/insc/?locale=${locale.value}#/`;
    } else {
      return `https://tp-lab.tptool.pro/insc/?locale=${locale.value}#/`;
    }
  });
  const nostrUrl = computed(() => {
    if (isTokenPocketPro.value) {
      return `https://tp-lab.tokenpocket.pro/nostr/?locale=${locale.value}#/`;
    } else {
      return `https://tp-lab.tptool.pro/nostr/?locale=${locale.value}#/`;
    }
  });
  const transitBuyUrl = computed(() => {
    return `https://buy.transit.finance/?locale=${locale.value}&theme=${theme.value}`;
  });
  const tokenClaimUrl = computed(() => {
    return `https://claim.tokenpocket.pro/?locale=${locale.value}#/`;
  });
  const TPCardUrl = computed(() => {
    if (isTokenPocketPro.value) {
      return `https://card.tokenpocket.pro/?locale=${locale.value}#/`;
    } else {
      return `https://card.tpwallet.io/?locale=${locale.value}#/`;
    }
  });
  const dappStoreUrl = computed(() => {
    if (isTokenPocketPro.value) {
      return `https://tokenpocket.pro/${locale.value}/dappstore?theme=${theme.value}`;
    } else {
      return `https://tpwallet.io/${locale.value}/dappstore?theme=${theme.value}`;
    }
  });
  const privacyUrl = computed(() => {
    if (isTokenPocketPro.value) {
      if (isZH.value) {
        return `https://tokenpocket.pro/privacy-zh/index.html`;
      } else {
        return `https://tokenpocket.pro/privacy-en/index.html`;
      }
    } else {
      if (isZH.value) {
        return `https://tpwallet.io/privacy-zh/index.html`;
      } else {
        return `https://tpwallet.io/privacy-en/index.html`;
      }
    }
  });
  const termsUrl = computed(() => {
    if (isTokenPocketPro.value) {
      if (isZH.value) {
        return `https://tokenpocket.pro/terms-zh/index.html`;
      } else {
        return `https://tokenpocket.pro/terms-en/index.html`;
      }
    } else {
      if (isZH.value) {
        return `https://tpwallet.io/terms-zh/index.html`;
      } else {
        return `https://tpwallet.io/terms-en/index.html`;
      }
    }
  });

  const TPCardRegisterUrl = computed(() => {
    if (locale.value === 'zh') {
      return `https://help.tokenpocket.pro/cn/wallet-operation/tp-card/register`
    } else {
      return `https://help.tokenpocket.pro/en/wallet-operation/tp-card/register`
    }
  })
  return {
    isTokenPocketPro,
    homeUrl,
    extensionUrl,
    dappUrl,
    tokenUrl,
    nftUrl,
    recruitingUrl,
    aboutUrl,
    developerUrl,
    helpUrl,
    desktopUrl,
    approvalUrl,
    batchSenderUrl,
    tokenSecurityUrl,
    contactUsUrl,
    rexUrl,
    joinUsUrl,
    stakeVaultUrl,
    verifyVersionUrl,
    fiveDegreesUrl,
    keypalUrl,
    transitFinanceUrl,
    transitSwapUrl,
    transitSwapMarkUrl,
    keyUrl,
    tokenProfileUrl,
    inscriptionUrl,
    nostrUrl,
    transitBuyUrl,
    tokenClaimUrl,
    TPCardUrl,
    dappStoreUrl,
    privacyUrl,
    termsUrl,
    TPCardRegisterUrl,
  };
}
