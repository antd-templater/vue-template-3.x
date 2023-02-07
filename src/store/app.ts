import defaultSettings, { ThemeMode, ContentWidth, ComponentSize, LayoutMode } from '@/configure/defaultSettings'
import { ref, reactive, computed } from 'vue'
import * as DarkReader from 'darkreader'

/**
 * 应用管理
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
  const fixedHeader = ref(defaultSettings.fixedHeader)
  const fixedSidebar = ref(defaultSettings.fixedSidebar)
  const contentWidth = ref(defaultSettings.contentWidth)
  const componentSize = ref(defaultSettings.componentSize)
  const autoHideHeader = ref(defaultSettings.autoHideHeader)

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
  const toggleHideHeader = (value: boolean) => { autoHideHeader.value = value }
  const toggleFixedHeader = (value: boolean) => { fixedHeader.value = value }
  const toggleFixedSidebar = (value: boolean) => { fixedSidebar.value = value }
  const toggleContentWidth = (value: ContentWidth) => { contentWidth.value = value }
  const toggleComponentSize = (value: ComponentSize) => { componentSize.value = value }
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
    fixedHeader,
    fixedSidebar,
    contentWidth,
    componentSize,
    autoHideHeader,
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
    toggleHideHeader,
    toggleFixedHeader,
    toggleFixedSidebar,
    toggleContentWidth,
    toggleComponentSize,
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
    strategies: [{ storage: localStorage }]
  }
})
