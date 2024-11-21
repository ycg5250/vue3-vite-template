import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useNavUrl } from './useNavUrl';
import useDarkImg from '../useDarkImg';

export function useNavList() {
  const { darkModeImg } = useDarkImg()
  const {
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
    dappStoreUrl,
    privacyUrl,
    termsUrl,
  } = useNavUrl();
  const { locale, t } = useI18n();
  const language = computed(() => {
    return locale.value;
  });
  const titleLang = computed(() => {
    switch (language.value) {
      case 'zh':
        return '中文简体';
      case 'zh-tw':
        return '中文繁体';
      case 'en':
        return 'English';
      case 'ko':
        return '한국어';
      case 'ru':
        return 'Русский';
      case 'es':
        return 'Español';
      case 'hi':
        return 'हिन्दी';
      case 'fil':
        return 'Filipino';
      case 'pt':
        return 'Português';
      case 'ja':
        return '日本語';
      case 'vi':
        return 'Tiếng Việt';
      case 'th':
        return 'ภาษาไทย';
      default:
        return '中文';
    }
  });

  const logoImg = computed(() => {
    return new URL(`../../assets/logo${darkModeImg.value}.png`, import.meta.url).href
  })

  const navList = computed(() => {
    return [
      // products
      {
        title: t('COMMON.LAYOUT.products'),
        img: new URL(`../../assets/nav-icon/products${darkModeImg.value}.png`, import.meta.url).href,
        children: [
          {
            class: `nav-icon-1${darkModeImg.value}`,
            desc: t('COMMON.LAYOUT.mobileWalletDesc'),
            title: t('COMMON.LAYOUT.mobileWallet'),
            local: true,
            url: homeUrl.value,
          },
          {
            class: `nav-icon-2${darkModeImg.value}`,
            desc: t('COMMON.LAYOUT.hardwareWalletDesc'),
            title: t('COMMON.LAYOUT.hardwareWallet'),
            url: keypalUrl.value,
          },
          {
            class: `nav-icon-26${darkModeImg.value}`,
            desc: t('COMMON.LAYOUT.TPCardDesc'),
            title: t('COMMON.LAYOUT.TPCard'),
            // url: extensionUrl.value,
          },
          {
            class: `nav-icon-3${darkModeImg.value}`,
            desc: t('COMMON.LAYOUT.extensionWalletDesc'),
            title: t('COMMON.LAYOUT.extensionWallet'),
            url: extensionUrl.value,
          },
        ],
      },
      // Tools
      {
        title: t('COMMON.LAYOUT.tools'),
        img: new URL(`../../assets/nav-icon/tools${darkModeImg.value}.png`, import.meta.url).href,
        column: 3,
        children: [
          {
            class: `nav-icon-4${darkModeImg.value}`,
            desc: t('COMMON.LAYOUT.versionVerificationDesc'),
            title: t('COMMON.LAYOUT.versionVerification'),
            url: verifyVersionUrl.value
          },
          {
            class: `nav-icon-5${darkModeImg.value}`,
            desc: t('COMMON.LAYOUT.easyInscriptionDesc'),
            title: t('COMMON.LAYOUT.easyInscription'),
            url: inscriptionUrl.value,
          },
          {
            class: `nav-icon-6${darkModeImg.value}`,
            desc: t('COMMON.LAYOUT.BATCH_SENDER_DESC'),
            title: t('COMMON.LAYOUT.BATCH_SENDER'),
            url: batchSenderUrl.value,
          },
          {
            class: `nav-icon-7${darkModeImg.value}`,
            desc: t('COMMON.LAYOUT.tokenSecurityDesc'),
            title: t('COMMON.LAYOUT.tokenSecurity'),
            url: tokenSecurityUrl.value,
          },
          {
            class: `nav-icon-8${darkModeImg.value}`,
            desc: t('COMMON.LAYOUT.keyGeneratorDesc'),
            title: t('COMMON.LAYOUT.keyGenerator'),
            url: keyUrl.value,
          },
          {
            class: `nav-icon-9${darkModeImg.value}`,
            desc: t('COMMON.LAYOUT.tokenClaimDesc'),
            title: t('COMMON.LAYOUT.tokenClaim'),
            url: tokenClaimUrl.value,
          },
          {
            class: `nav-icon-10${darkModeImg.value}`,
            desc: t('COMMON.LAYOUT.tokenProfileDesc'),
            title: t('COMMON.LAYOUT.tokenProfile'),
            url: tokenProfileUrl.value,
          },
          {
            class: `nav-icon-11${darkModeImg.value}`,
            desc: t('COMMON.LAYOUT.approvalDetectorDesc'),
            title: t('COMMON.LAYOUT.approvalDetector'),
            url: approvalUrl.value,
          },
          {
            class: `nav-icon-12${darkModeImg.value}`,
            desc: t('COMMON.LAYOUT.nostrAssetsBatchSenderDesc'),
            title: t('COMMON.LAYOUT.nostrAssetsBatchSender'),
            url: nostrUrl.value,
          },
        ],
      },
      // Trade
      {
        title: t('COMMON.LAYOUT.trade'),
        img: new URL(`../../assets/nav-icon/trade${darkModeImg.value}.png`, import.meta.url).href,
        children: [
          {
            class: `nav-icon-13${darkModeImg.value}`,
            desc: t('COMMON.LAYOUT.swapDesc'),
            title: t('COMMON.LAYOUT.swap'),
            url: transitSwapUrl.value,
          },
          {
            class: `nav-icon-14${darkModeImg.value}`,
            desc: t('COMMON.LAYOUT.bridgeDesc'),
            title: t('COMMON.LAYOUT.bridge'),
            url: transitSwapUrl.value,
          },
          {
            class: `nav-icon-15${darkModeImg.value}`,
            desc: t('COMMON.LAYOUT.buyCryptoDesc'),
            title: t('COMMON.LAYOUT.buyCrypto'),
            url: transitBuyUrl.value,
          },
          {
            class: `nav-icon-16${darkModeImg.value}`,
            desc: t('COMMON.LAYOUT.marketDesc'),
            title: t('COMMON.LAYOUT.market'),
            url: transitSwapMarkUrl.value,
          },
        ],
      },
      // dappstore
      {
        title: t('COMMON.LAYOUT.dappStore'),
        url: dappStoreUrl.value,
      },
      // 项目提交
      {
        title: t('COMMON.LAYOUT.build'),
        img: new URL(`../../assets/nav-icon/build${darkModeImg.value}.png`, import.meta.url).href,
        leftDis: true,
        children: [
          {
            class: `nav-icon-19${darkModeImg.value}`,
            desc: t('COMMON.LAYOUT.subDAppDesc'),
            title: t('COMMON.LAYOUT.subDApp'),
            url: dappUrl.value,
          },
          {
            class: `nav-icon-18${darkModeImg.value}`,
            desc: t('COMMON.LAYOUT.subNFTDesc'),
            title: t('COMMON.LAYOUT.subNFT'),
            url: nftUrl.value,
          },
          {
            class: `nav-icon-21${darkModeImg.value}`,
            desc: t('COMMON.LAYOUT.subTokenDesc'),
            title: t('COMMON.LAYOUT.subToken'),
            url: tokenUrl.value,
          },
          {
            class: `nav-icon-20${darkModeImg.value}`,
            desc: t('COMMON.LAYOUT.subChainDesc'),
            title: t('COMMON.LAYOUT.subChain'),
            url: 'https://github.com/TP-Lab/networklist-org',
          },
          {
            class: `nav-icon-17${darkModeImg.value}`,
            desc: t('COMMON.LAYOUT.developersDesc'),
            title: t('COMMON.LAYOUT.developers'),
            url: developerUrl.value,
          },
        ],
      },
      {
        title: t('COMMON.LAYOUT.support'),
        img: new URL(`../../assets/nav-icon/support${darkModeImg.value}.png`, import.meta.url).href,
        children: [
          {
            class: `nav-icon-22${darkModeImg.value}`,
            desc: t('COMMON.LAYOUT.helpCenterDesc'),
            title: t('COMMON.LAYOUT.helpCenter'),
            url: helpUrl.value,
          },
          {
            class: `nav-icon-23${darkModeImg.value}`,
            desc: t('COMMON.LAYOUT.contactUsDesc'),
            title: t('COMMON.LAYOUT.contactUs'),
            url: contactUsUrl.value,
          },
          {
            class: `nav-icon-24${darkModeImg.value}`,
            desc: t('COMMON.LAYOUT.forumDesc'),
            title: t('COMMON.LAYOUT.forum'),
            url: `https://fans.tokenpocket.pro/`,
          },
        ],
      },
      // 空数据
      {
        title: '',
      },
      {
        title: t('COMMON.LAYOUT.darkMode'),
        darkMode: true
      },
      // 语言
      {
        title: titleLang.value,
        lang: true,
        class: 'language-changes',
        children: [
          { title: '简体中文', lang: 'zh', link: '/zh', class: 'locale-zh' },
          {
            title: '繁体中文',
            lang: 'zh-tw',
            link: '/zh-tw',
            class: 'locale-zh-tw',
          },
          { title: 'English', lang: 'en', link: '/en', class: 'locale-en' },
          { title: '한국어', lang: 'ko', link: '/ko', class: 'locale-ko' },
          { title: 'Русский', lang: 'ru', link: '/ru', class: 'locale-ru' },
          { title: 'Español', lang: 'es', link: '/es', class: 'locale-es' },
          { title: 'हिन्दी', lang: 'hi', link: '/hi', class: 'locale-hi' },
          { title: 'Filipino', lang: 'fil', link: '/fil', class: 'locale-fil' },
          { title: 'Português', lang: 'pt', link: '/pt', class: 'locale-pt' },
          { title: '日本語', lang: 'ja', link: '/ja', class: 'locale-ja' },
          { title: 'Tiếng Việt', lang: 'vi', link: '/vi', class: 'locale-vi' },
          { title: 'ภาษาไทย', lang: 'th', link: '/th', class: 'locale-th' },
        ],
      },
    ];
  });
  const followList = computed(() => {
    return [
      { url: 'https://twitter.com/TokenPocket_TP' },
      {
        isTelegram: true,
        url:
          locale.value === 'zh' || locale.value === 'zh-tw'
            ? 'https://t.me/tokenPocket_cn'
            : locale.value === 'ko'
            ? 'https://t.me/tokenpocket_kor'
            : 'https://t.me/tokenpocket_en',
      },
      { url: 'https://fans.tokenpocket.pro/' },
      { url: 'https://www.youtube.com/channel/UCudaS5hcbqUaMtOGHmQ2e0A' },
      { url: 'https://discord.com/invite/NKPM8TXFQk' },
      { url: 'https://github.com/TP-Lab' },
      { url: 'https://tokenpocket-gm.medium.com/' },
    ];
  });
  
  const footerList = computed(() => {
    return [
      // Products
      [
        {
          title: t('COMMON.LAYOUT.products'),
          data: [
            {
              title: t('COMMON.LAYOUT.mobileWallet'),
              local: true,
              url: homeUrl.value,
            },
            {
              title: t('COMMON.LAYOUT.hardwareWallet'),
              url: keypalUrl.value,
            },
            {
              title: t('COMMON.LAYOUT.extensionWallet'),
              url: extensionUrl.value,
            },
            {
              title: t('COMMON.LAYOUT.TPCard'),
              curPage: true
            },
            {
              title: t('COMMON.LAYOUT.swap'),
              url: transitSwapUrl.value,
            },
            {
              title: t('COMMON.LAYOUT.market'),
              url: transitSwapMarkUrl.value,
            },
            {
              title: t('COMMON.LAYOUT.buyCryptoFooter'),
              url: transitBuyUrl.value,
            },
            {
              title: t('COMMON.LAYOUT.fiveDegrees'),
              url: fiveDegreesUrl.value,
            },
          ],
        },
      ],
      // Tools
      [
        {
          title: t('COMMON.LAYOUT.tools'),
          data: [
            {
              title: t('COMMON.LAYOUT.versionVerification'),
              url: verifyVersionUrl.value
            },
            {
              title: t('COMMON.LAYOUT.tokenSecurity'),
              url: tokenSecurityUrl.value,
            },
            {
              title: t('COMMON.LAYOUT.tokenProfile'),
              url: tokenProfileUrl.value,
            },
            {
              title: t('COMMON.LAYOUT.easyInscription'),
              url: inscriptionUrl.value,
            },
            {
              title: t('COMMON.LAYOUT.keyGenerator'),
              url: keyUrl.value
            },
            {
              title: t('COMMON.LAYOUT.approvalDetector'),
              url: approvalUrl.value,
            },
            {
              title: t('COMMON.LAYOUT.BATCH_SENDER'),
              url: batchSenderUrl.value,
            },
            {
              title: t('COMMON.LAYOUT.tokenClaim'),
              url: tokenClaimUrl.value,
            },
            {
              title: t('COMMON.LAYOUT.nostrAssetsBatchSender'),
              url: nostrUrl.value,
            },
            {
              title: 'REX',
              url: rexUrl.value,
            },
          ],
        },
      ],
      // Explorer
      [
        {
          title: t('COMMON.LAYOUT.explorer'),
          data: [
            {
              title: t('COMMON.LAYOUT.swap'),
              url: transitSwapUrl.value,
            },
            {
              title: t('COMMON.LAYOUT.bridge'),
              url: transitSwapUrl.value,
            },
            {
              title: t('COMMON.LAYOUT.buyCrypto'),
              url: transitBuyUrl.value,
            },
            {
              title: t('COMMON.LAYOUT.market'),
              url: transitSwapMarkUrl.value,
            },
            {
              title: t('COMMON.LAYOUT.dappStore'),
              url: dappStoreUrl.value,
            },
          ],
        },
      ],
      // Build
      [
        {
          title: t('COMMON.LAYOUT.build'),
          data: [
            {
              title: t('COMMON.LAYOUT.devCenter'),
              url: developerUrl.value,
            },
            {
              title: 'TP Lab',
              url: 'https://github.com/TP-Lab',
            },
            {
              title: t('COMMON.LAYOUT.subDApp'),
              url: dappUrl.value,
            },
            {
              title: t('COMMON.LAYOUT.subToken'),
              url: tokenUrl.value,
            },
            {
              title: t('COMMON.LAYOUT.subNFT'),
              url: nftUrl.value,
            },
            {
              title: t('COMMON.LAYOUT.subChain'),
              url: 'https://github.com/TP-Lab/networklist-org',
            },
            {
              title: t('COMMON.LAYOUT.bugBounty'),
              url: `https://bugrap.io/bounties/TokenPocket`,
            },
          ],
        },
      ],
      // Learn Company
      [
        {
          title: t('COMMON.LAYOUT.learn'),
          data: [
            {
              title: t('COMMON.LAYOUT.blockchainGuide'),
              url: locale.value === 'zh'
                ? 'https://github.tokenpocket.pro/BlockchainGuideSeries/#/'
                : 'https://github.tokenpocket.pro/BlockchainGuideSeries-EN/#/',
            },
            {
              title: t('COMMON.LAYOUT.tronWallet'),
              url: locale.value === 'zh'
                ? 'https://github.tokenpocket.pro/BlockchainGuide-TRON/#/'
                : 'https://github.tokenpocket.pro/BlockchainGuide-TRON-EN/#/',
            },
            {
              title: t('COMMON.LAYOUT.iostWallet'),
              url: locale.value === 'zh'
                ? 'https://github.tokenpocket.pro/BlockchainGuide-IOST/#/'
                : 'https://github.tokenpocket.pro/BlockchainGuide-IOST-EN/#/',
            },
          ],
        },
        {
          title: t('COMMON.LAYOUT.company'),
          data: (() => {
            var list = [
              {
                title: t('COMMON.LAYOUT.about'),
                url: aboutUrl.value,
              },
              {
                title: t('COMMON.LAYOUT.careers'),
                url: joinUsUrl.value,
              },
              {
                title: t('COMMON.LAYOUT.tpMan'),
                url: recruitingUrl.value,
              },
              {
                title: t('COMMON.LAYOUT.pressKit'),
                url: 'https://hilarious-eucalyptus-a2f.notion.site/TokenPocket-Brand-Resources-ab6e6019d20342eea025ec62955084fc',
              },
            ];
            if (locale.value === 'zh') {
              list.push({
                title: t('COMMON.LAYOUT.swagShop'),
                url: 'https://shop95838799.m.youzan.com/v2/showcase/homepage?alias=sptfzUCg0j',
              });
            }
            return list;
          })(),
        },
      ],
      // Support Legal
      [
        {
          title: t('COMMON.LAYOUT.support'),
          data: [
            {
              title: t('COMMON.LAYOUT.helpCenter'),
              url: helpUrl.value,
            },
            {
              title: t('COMMON.LAYOUT.contactUs'),
              url: contactUsUrl.value,
            },
          ],
        },
        {
          title: t('COMMON.LAYOUT.legal'),
          data: [
            {
              title: t('COMMON.LAYOUT.privacyPolicy'),
              url: privacyUrl.value,
            },
            {
              title: t('COMMON.LAYOUT.terms'),
              url: termsUrl.value,
            },
          ],
        },
      ],
    ];
  });
  return { titleLang, navList, footerList, followList, logoImg };
}
