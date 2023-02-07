<template>
  <AConfigProvider
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

const appStore = useAppStore()
const computedSize = computed(() => appStore.componentSize)
const computedLocale = computed(() => appStore.language === enUS.locale ? enUS : zhCN)

watchEffect(() => {
  ConfigProvider.config({ theme: appStore.themeColor })
  appStore.isMobile ? document.body.classList.add('is-mobile') : document.body.classList.remove('is-mobile')
  appStore.isMixMenu ? document.body.classList.add('is-mixmenu') : document.body.classList.remove('is-mixmenu')
  appStore.isTopMenu ? document.body.classList.add('is-topmenu') : document.body.classList.remove('is-topmenu')
  appStore.isSideMenu ? document.body.classList.add('is-sidemenu') : document.body.classList.remove('is-sidemenu')
  appStore.themeWeak ? document.body.classList.add('is-theme-weak') : document.body.classList.remove('is-theme-weak')
  appStore.keepAlive ? document.body.classList.add('is-keep-alive') : document.body.classList.remove('is-keep-alive')
  appStore.multiTab ? document.body.classList.add('is-multi-tab') : document.body.classList.remove('is-multi-tab')
})

watch(() => appStore.domTitle, title => { document.title = title.trim() || document.title }, { immediate: true })
</script>
