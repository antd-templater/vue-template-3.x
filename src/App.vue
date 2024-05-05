<template>
  <AConfigProvider
    :theme="computedTheme"
    :locale="computedLocale"
    :componentSize="computedSize"
  >
    <RouterView />
  </AConfigProvider>
</template>

<script setup lang="ts">
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import enUS from 'ant-design-vue/es/locale/en_US'

import ConfigProvider from 'ant-design-vue/es/config-provider'
import useAppStore from '@/store/app'
import dayjs from '@/plugin/dayjs'

const appStore = useAppStore()
const computedSize = computed(() => appStore.componentSize)
const computedLocale = computed(() => appStore.language === enUS.locale ? enUS : zhCN)

const computedTheme = computed(() => {
  return {
    token: {
      borderRadius: 4,
      colorLink: appStore.primaryColor,
      colorLinkHover: appStore.primaryColor,
      colorLinkActive: appStore.primaryColor,
      colorPrimary: appStore.primaryColor,
      colorWarning: appStore.warningColor,
      colorSuccess: appStore.successColor,
      colorError: appStore.errorColor,
      colorInfo: appStore.infoColor,
    },
  }
})

watchEffect(() => {
  appStore.isMacOS ? document.body.classList.add('is-mac-os') : document.body.classList.remove('is-mac-os')
  appStore.isMobile ? document.body.classList.add('is-mobile') : document.body.classList.remove('is-mobile')
  appStore.isMixMenu ? document.body.classList.add('is-mix-menu') : document.body.classList.remove('is-mix-menu')
  appStore.isTopMenu ? document.body.classList.add('is-top-menu') : document.body.classList.remove('is-top-menu')
  appStore.isSideMenu ? document.body.classList.add('is-side-menu') : document.body.classList.remove('is-side-menu')
  appStore.isRealDark ? document.body.classList.add('is-real-dark') : document.body.classList.remove('is-real-dark')
  appStore.isWindowOS ? document.body.classList.add('is-window-os') : document.body.classList.remove('is-window-os')
  appStore.themeWeak ? document.body.classList.add('is-theme-weak') : document.body.classList.remove('is-theme-weak')
  appStore.keepAlive ? document.body.classList.add('is-keep-alive') : document.body.classList.remove('is-keep-alive')
  appStore.multiTab ? document.body.classList.add('is-multi-tab') : document.body.classList.remove('is-multi-tab')
  ConfigProvider.config({ theme: appStore.themeColor })
  dayjs.locale(appStore.language)
})
</script>
