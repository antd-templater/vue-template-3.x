import 'ant-design-vue/es/breadcrumb/style/index.less'

import ABreadcrumb, { BreadcrumbItem as ABreadcrumbItem } from 'ant-design-vue/es/breadcrumb'
import { HomeOutlined } from '@ant-design/icons-vue'

export default defineComponent({
  name: 'LayoutBreadcrumb',
  props: {
    isFixed: {
      type: Boolean,
      default: false
    },
    isMobile: {
      type: Boolean,
      default: false
    },
    isTopMenu: {
      type: Boolean,
      default: false
    },
    isMixMenu: {
      type: Boolean,
      default: false
    },
    multiTab: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const route = useRoute()
    const breadcrumbs = computed(() => route.matched)

    return () => {
      if (props.isMixMenu && !props.isMobile || props.multiTab) {
        return
      }

      return (
        <div
          class='layout-breadcrumb'
          style='height: 38px;'
        >
          <div
            style={{
              width: '100%',
              height: '38px',
              padding: '9px 0 0 12px',
              backgroundColor: '#ffffff',
              boxShadow: '0 1px 1px 0 rgba(0, 0, 0, 0.15)',
              position: 'relative',
              zIndex: 9
            }}
          >
            <ABreadcrumb>
              {
                breadcrumbs.value.map((route, index) => (
                  <ABreadcrumbItem>
                    {index === 0 && <HomeOutlined/>}
                    <span>{route.meta.title}</span>
                  </ABreadcrumbItem>
                ))
              }
            </ABreadcrumb>
          </div>
        </div>
      )
    }
  }
})
