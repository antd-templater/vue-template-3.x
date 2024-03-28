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
    isMobile: VueTypes.bool().def(false),
    isSideMenu: VueTypes.bool().def(false),
    collapsed: VueTypes.bool().def(false),
    layoutMode: VueTypes.string().def('side'),
    themeMode: VueTypes.string().def('light')
  },
  setup(props) {
    const { full, title, collapsed, isSideMenu } = toRefs(props)
    const logoWidth = computed(() => isSideMenu.value && collapsed.value ? 48 : 192)
    const logoShowUrl = computed(() => isSideMenu.value && collapsed.value ? logoShrinkUrl.value : logoNormalUrl.value)
    const logoShrinkUrl = computed(() => (!props.isMobile || props.layoutMode !== 'mix') && props.themeMode !== 'light' ? logoShrinkDart : logoShrinkLight)
    const logoNormalUrl = computed(() => (!props.isMobile || props.layoutMode !== 'mix') && props.themeMode !== 'light' ? logoDark : logoLight)

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

      const titleStyle = {
        flex: '1 1 auto',
        margin: '0 0',
        height: '48px',
        fontSize: '18px',
        lineHeight: '48px',
        color: props.themeMode !== 'light' ? '#ffffff' : 'var(--ant-primary-color)'
      }

      if (props.isMobile && props.layoutMode === 'mix') {
        Object.assign(titleStyle, {
          color: 'var(--ant-primary-color)'
        })
      }

      return (
        <h1 style={titleStyle}>
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
