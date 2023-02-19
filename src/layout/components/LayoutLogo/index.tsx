import logoShrinkLight from '@/assets/logo/logo_shrink_light.png?url'
import logoShrinkDart from '@/assets/logo/logo_shrink_dark.png?url'
import logoLight from '@/assets/logo/logo_light.png?url'
import logoDark from '@/assets/logo/logo_dark.png?url'
import * as VueTypes from 'vue-types'

export default defineComponent({
  name: 'LayoutLogo',
  props: {
    full: VueTypes.bool().def(false),
    title: VueTypes.string().def(''),
    isSideMenu: VueTypes.bool().def(false),
    collapsed: VueTypes.bool().def(false),
    themeMode: VueTypes.string().def('light')
  },
  setup(props) {
    const { full, title, collapsed, isSideMenu } = toRefs(props)
    const logoWidth = computed(() => isSideMenu.value && collapsed.value ? 48 : 192)
    const logoShowUrl = computed(() => isSideMenu.value && collapsed.value ? logoShrinkUrl.value : logoNormalUrl.value)
    const logoShrinkUrl = computed(() => props.themeMode !== 'light' ? logoShrinkDart : logoShrinkLight)
    const logoNormalUrl = computed(() => props.themeMode !== 'light' ? logoDark : logoLight)

    const LogoContent = () => {
      return (
        <div
          class='layout-logo-content'
          style={{
            flex: '0 0 auto',
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
            width: full.value || !title.value ? '100%' : '48px',
            height: full.value || !title.value ? '100%' : '48px',
            textAlign: 'center',
            overflow: 'hidden',
            padding: '0 0',
            margin: '0 0'
          }}
        >
          <img
            src={full.value || !title.value ? logoShowUrl.value : logoShrinkUrl.value}
            style='width: 100%; height: 100%; display: block'
          />
        </div>
      )
    }

    const LogoTitle = () => {
      if (isSideMenu.value && collapsed.value) {
        return null
      }

      return (
        <h1 style='flex: 1 1 auto; margin: 0 0; height: 48px; font-size: 18px; line-height: 48px; color: var(--ant-primary-color);'>
          {title.value}
        </h1>
      )
    }

    return () => (
      <div
        class='layout-logo-container'
        style={{
          display: 'flex',
          width: `${logoWidth.value}px`,
          height: '48px'
        }}
      >
        <LogoContent/>
        <LogoTitle/>
      </div>
    )
  }
})
