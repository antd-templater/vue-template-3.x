import './index.less'
import 'ant-design-vue/es/tabs/style/index.less'
import 'ant-design-vue/es/menu/style/index.less'
import 'ant-design-vue/es/dropdown/style/index.less'

import ATabs, { TabPane as ATabPane } from 'ant-design-vue/es/tabs'
import AMenu, { MenuItem as AMenuItem } from 'ant-design-vue/es/menu'
import ADropdown from 'ant-design-vue/es/dropdown'
import AMessage from 'ant-design-vue/es/message'
import useTagStore from '@/store/tag'

export default defineComponent({
  name: 'LayoutMultiTab',
  props: {
    isTopMenu: {
      type: Boolean,
      default: false
    },
    isFixed: {
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
    const router = useRouter()
    const tagStore = useTagStore()
    const activeKey = ref(route.fullPath)

    const active = (route: any) => {
      route = { ...route, meta: { ...route.meta } }
      activeKey.value = route.fullPath
      tagStore.updateVisitedTags(route)
      tagStore.addCacheTags(route)
      tagStore.addVisitTags(route)
    }

    const target = (key: any) => {
      return tagStore.visitTags.find(tag => key === tag || key === tag.fullPath)
    }

    const remove = (tags: any[]) => {
      for (const tag of tags) {
        tagStore.delTags(tag)
      }

      if (tags.some(tag => activeKey.value === tag.fullPath)) {
        activeKey.value = tagStore.stackTags.map(tag => tag.fullPath)[0] || '/'
      }
    }

    const closeThis = (key: any) => {
      const tag = target(key)
      const single = tagStore.visitTags.length <= 1
      tag && single && AMessage.info('这是最后一个标签了, 无法被关闭')
      tag && !single && remove([target(key)])
    }

    const closeLeft = (key: any) => {
      const limit = tagStore.visitTags.findIndex(tag => tag === target(key))
      limit > 0 && remove(tagStore.visitTags.filter((tag, index) => index < limit))
      limit <= 0 && AMessage.info('左侧没有标签')
    }

    const closeRight = (key: any) => {
      const count = tagStore.visitTags.length - 1
      const limit = tagStore.visitTags.findIndex(tag => tag === target(key))
      limit < count && remove(tagStore.visitTags.filter((tag, index) => index > limit))
      limit >= count && AMessage.info('右侧没有标签')
    }

    const closeOthers = (key: any) => {
      const limit = tagStore.visitTags.findIndex(tag => tag === target(key))
      remove(tagStore.visitTags.filter((tag, index) => index !== limit))
    }

    const closeOperater: Record<any, any> = {
      closeThis,
      closeLeft,
      closeRight,
      closeOthers
    }

    tagStore.$onAction(({ name, after }) => {
      if (name === 'delCurrentTag') {
        const tag = target(activeKey.value)
        after(() => remove([tag]))
      }
    })

    watch(activeKey, key => key !== route.fullPath && router.push(target(key)!))
    watch(route, route => active(route), { immediate: true })

    return () => {
      const ATabPanes = () => tagStore.visitTags.map(tag => {
        const fullPath = tag.fullPath
        const external = tag.meta.match === 'external'
        const tabTitle = external && tag.query?.title || tag.meta.title

        return (
          <ATabPane
            key={tag.fullPath}
            tab={ADropdownTab(tabTitle, fullPath)}
            closable={tagStore.visitTags.length > 1}
          />
        )
      })

      const ADropdownMenu = (path: string) => {
        return (
          <AMenu onClick={ ({ key }) => closeOperater[key]?.(path) }>
            <AMenuItem key='closeThis'>关闭当前标签</AMenuItem>
            <AMenuItem key='closeLeft'>关闭左侧标签</AMenuItem>
            <AMenuItem key='closeRight'>关闭右侧标签</AMenuItem>
            <AMenuItem key='closeOthers'>关闭其他标签</AMenuItem>
          </AMenu>
        )
      }

      const ADropdownTab = (title: string, path: string) => {
        return (
          <ADropdown overlay={ADropdownMenu(path)} trigger={['contextmenu']}>
            <span>{title}</span>
          </ADropdown>
        )
      }

      if (props.multiTab) {
        return (
          <div class='layout-multi-tabs'>
            <div
              style={{
                width: '100%',
                height: '38px',
                margin: '0 auto',
                boxSizing: 'border-box',
                maxWidth: props.isTopMenu && props.isFixed ? '1200px' : 'unset',
                boxShadow: '0 1px 1px 0 rgba(0, 0, 0, 0.15)',
                position: 'relative',
                zIndex: 9
              }}
            >
              <ATabs
                hideAdd
                size='small'
                type='editable-card'
                v-model={[activeKey.value, 'activeKey']}
                onEdit={(key, action) => action === 'remove' ? closeThis(key) : null }
                tabBarStyle={{ margin: '0 0', padding: '6.5px 0 5px', background: '#ffffff' }}
              >
                { ATabPanes() }
              </ATabs>
            </div>
          </div>
        )
      }
    }
  }
})
