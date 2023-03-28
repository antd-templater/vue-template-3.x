import 'ant-design-vue/es/breadcrumb/style/index.less'

import ABreadcrumb, { BreadcrumbItem as ABreadcrumbItem } from 'ant-design-vue/es/breadcrumb'
import { HomeOutlined } from '@ant-design/icons-vue'
import * as VueTypes from 'vue-types'

export default defineComponent({
  name: 'LayoutBreadcrumb',
  props: {
    multiTab: VueTypes.bool().def(false),
    isMobile: VueTypes.bool().def(false),
    isMixMenu: VueTypes.bool().def(false),
    hideMixHeaderTab: VueTypes.bool().def(true)
  },
  setup(props) {
    const route = useRoute()
    const breadcrumbs = computed(() => route.matched)

    return () => {
      if (props.multiTab) {
        return
      }

      if (!props.isMobile && props.isMixMenu && props.hideMixHeaderTab) {
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
