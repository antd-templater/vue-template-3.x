import defaultSettings, { ThemeMode, ContentWidth, ComponentSize, LayoutMode } from '@/configure/defaultSettings'
import { ref, reactive, computed } from 'vue'
import * as DarkReader from 'darkreader'

/**
 * App 应用管理
 */
export default defineStore('app', () => {
  const themeColor = reactive({
    primaryColor: defaultSettings.themeColor.primaryColor,
    warningColor: defaultSettings.themeColor.warningColor,
    successColor: defaultSettings.themeColor.successColor,
    errorColor: defaultSettings.themeColor.errorColor,
    infoColor: defaultSettings.themeColor.infoColor
  })

  const isMobile = ref(false)
  const collapsed = ref(false)
  const domTitle = ref(defaultSettings.domTitle)
  const language = ref(defaultSettings.language)
  const multiTab = ref(defaultSettings.multiTab)
  const keepAlive = ref(defaultSettings.keepAlive)
  const themeMode = ref(defaultSettings.themeMode)
  const themeWeak = ref(defaultSettings.themeWeak)
  const layoutMode = ref(defaultSettings.layoutMode)
  const iconPrefix = ref(defaultSettings.iconPrefix)
  const iconfontUrl = ref(defaultSettings.iconfontUrl)
  const fixedHeader = ref(defaultSettings.fixedHeader)
  const fixedSidebar = ref(defaultSettings.fixedSidebar)
  const fixedHeaderTab = ref(defaultSettings.fixedHeaderTab)
  const hideMixHeaderTab = ref(defaultSettings.hideMixHeaderTab)
  const componentSize = ref(defaultSettings.componentSize)
  const contentWidth = ref(defaultSettings.contentWidth)

  const isFixed = computed(() => contentWidth.value === 'Fixed')
  const isFluid = computed(() => contentWidth.value === 'Fluid')
  const isMixMenu = computed(() => layoutMode.value === 'mix')
  const isTopMenu = computed(() => layoutMode.value === 'top')
  const isSideMenu = computed(() => layoutMode.value === 'side')
  const primaryColor = computed(() => themeColor.primaryColor)
  const warningColor = computed(() => themeColor.warningColor)
  const successColor = computed(() => themeColor.successColor)
  const errorColor = computed(() => themeColor.errorColor)
  const infoColor = computed(() => themeColor.infoColor)

  const toggleMobile = (value: boolean) => { isMobile.value = value }
  const toggleDomTitle = (value: string) => { domTitle.value = value.trim() || defaultSettings.domTitle }
  const toggleLanguage = (value: string) => { language.value = value }
  const toggleMultiTab = (value: boolean) => { multiTab.value = value }
  const toggleKeepAlive = (value: boolean) => { keepAlive.value = value }
  const toggleCollapsed = (value: boolean) => { collapsed.value = value }
  const toggleLayoutMode = (value: LayoutMode) => { layoutMode.value = value }
  const toggleIconPrefix = (value: string) => { iconPrefix.value = value }
  const toggleIconfontUrl = (value: string) => { iconfontUrl.value = value }
  const toggleFixedHeader = (value: boolean) => { fixedHeader.value = value }
  const toggleFixedSidebar = (value: boolean) => { fixedSidebar.value = value }
  const toggleFixedHeaderTab = (value: boolean) => { fixedHeaderTab.value = value }
  const toggleHideMixHeaderTab = (value: boolean) => { hideMixHeaderTab.value = value }
  const toggleComponentSize = (value: ComponentSize) => { componentSize.value = value }
  const toggleContentWidth = (value: ContentWidth) => { contentWidth.value = value }
  const togglePrimaryColor = (value: string) => { themeColor.primaryColor = value }
  const toggleWarningColor = (value: string) => { themeColor.warningColor = value }
  const toggleSuccessColor = (value: string) => { themeColor.successColor = value }
  const toggleErrorColor = (value: string) => { themeColor.errorColor = value }
  const toggleInfoColor = (value: string) => { themeColor.infoColor = value }
  const toggleThemeWeak = (value: boolean) => { themeWeak.value = value }

  const toggleThemeMode = (value: ThemeMode) => {
    const isRealDark = value === 'realDark'
    const isEnabled = DarkReader.isEnabled()

    if (isRealDark && !isEnabled) DarkReader.enable({ brightness: 100, contrast: 90, sepia: 10 })
    if (!isRealDark && isEnabled) DarkReader.disable()

    themeMode.value = value
  }

  const layoutViewStyle = computed(() => {
    let width = '100%'
    let height = '100vh'
    let minWidth = '100%'
    let maxWidth = 'none'
    let minHeight = '100vh'
    let maxHeight = 'none'

    if (isTopMenu.value && contentWidth.value === 'Fixed') {
      width = '100%'
      minWidth = '100%'
      maxWidth = '1200px'
    }

    if (isMixMenu.value && (hideMixHeaderTab.value || !fixedHeaderTab.value)) {
      height = 'calc(100vh - 50px)'
    }

    if (isMixMenu.value && !hideMixHeaderTab.value && fixedHeaderTab.value) {
      height = 'calc(100vh - 88px)'
    }

    if (isMixMenu.value && !hideMixHeaderTab.value) {
      minHeight = 'calc(100vh - 88px)'
    }

    if (isMixMenu.value && hideMixHeaderTab.value) {
      minHeight = 'calc(100vh - 50px)'
    }

    if (!isMixMenu.value && fixedHeader.value && fixedHeaderTab.value) {
      height = 'calc(100vh - 88px)'
    }

    if (!isMixMenu.value && fixedHeader.value && !fixedHeaderTab.value) {
      height = 'calc(100vh - 50px)'
    }

    if (!isMixMenu.value && !fixedHeader.value) {
      height = '100vh'
    }

    if (!isMixMenu.value) {
      minHeight = 'calc(100vh - 88px)'
    }

    if (isMobile.value) {
      width = '100%'
      minWidth = '100%'
      maxWidth = 'none'
      maxHeight = 'none'
    }

    return {
      width: width,
      height: height,
      minWidth: minWidth,
      maxWidth: maxWidth,
      minHeight: minHeight,
      maxHeight: maxHeight
    }
  })

  return {
    isFixed,
    isFluid,
    isMobile,
    domTitle,
    language,
    multiTab,
    keepAlive,
    collapsed,
    themeMode,
    themeWeak,
    isMixMenu,
    isTopMenu,
    isSideMenu,
    layoutMode,
    iconPrefix,
    iconfontUrl,
    fixedHeader,
    fixedSidebar,
    fixedHeaderTab,
    hideMixHeaderTab,
    layoutViewStyle,
    componentSize,
    contentWidth,
    primaryColor,
    warningColor,
    successColor,
    errorColor,
    infoColor,
    themeColor,

    toggleMobile,
    toggleDomTitle,
    toggleLanguage,
    toggleMultiTab,
    toggleKeepAlive,
    toggleCollapsed,
    toggleThemeMode,
    toggleLayoutMode,
    toggleIconPrefix,
    toggleIconfontUrl,
    toggleFixedHeader,
    toggleFixedSidebar,
    toggleFixedHeaderTab,
    toggleHideMixHeaderTab,
    toggleComponentSize,
    toggleContentWidth,
    togglePrimaryColor,
    toggleWarningColor,
    toggleSuccessColor,
    toggleErrorColor,
    toggleInfoColor,
    toggleThemeWeak
  }
}, {
  persist: {
    enabled: true,
    strategies: [{
      key: 'STORE-APP',
      storage: localStorage
    }]
  }
})
