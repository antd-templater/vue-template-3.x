import './index.less'
import 'ant-design-vue/es/tooltip/style/index.less'
import 'ant-design-vue/es/divider/style/index.less'
import 'ant-design-vue/es/select/style/index.less'
import 'ant-design-vue/es/drawer/style/index.less'
import 'ant-design-vue/es/switch/style/index.less'
import 'ant-design-vue/es/alert/style/index.less'
import 'ant-design-vue/es/list/style/index.less'
import 'ant-design-vue/es/tag/style/index.less'

import { Teleport } from 'vue'
import { SettingOutlined, CloseOutlined, CheckOutlined } from '@ant-design/icons-vue'
import AList, { ListItem as AListItem, ListItemMeta as AListItemMeta } from 'ant-design-vue/es/list'
import ASelect, { SelectOption as ASelectOption } from 'ant-design-vue/es/select'
import presetThemeColors from '@/configure/presetThemeColors'
import presetEnvironment from '@/configure/presetEnvironment'
import defaultSettings from '@/configure/defaultSettings'
import ATooltip from 'ant-design-vue/es/tooltip'
import ADivider from 'ant-design-vue/es/divider'
import ADrawer from 'ant-design-vue/es/drawer'
import ASwitch from 'ant-design-vue/es/switch'
import AAlert from 'ant-design-vue/es/alert'
import ATag from 'ant-design-vue/es/tag'
import useAppStore from '@/store/app'

export default defineComponent({
  name: 'LayoutSettingDrawer',
  setup() {
    const visible = ref(false)
    const appStore = useAppStore()
    const isRender = !presetEnvironment.AppHiddenSettings

    const ALayoutMode = (props: any) => {
      return (
        <div { ...props }>
          <h3 class='setting-title'>布局风格</h3>
          <div class='setting-checbox'>
            <ATooltip title='侧边菜单导航'>
              <div
                class='setting-checbox-item'
                onClick={ () => appStore.toggleLayoutMode('side') }
              >
                <div class='setting-icon bg-light sidemenu-dark topmenu-light'/>
                <div class='setting-check'>
                  { appStore.isSideMenu ? <CheckOutlined/> : null }
                </div>
              </div>
            </ATooltip>

            <ATooltip title='顶部菜单导航'>
              <div
                class='setting-checbox-item'
                onClick={ () => appStore.toggleLayoutMode('top') }
              >
                <div class='setting-icon bg-light topmenu-dark'/>
                <div class='setting-check'>
                  { appStore.isTopMenu ? <CheckOutlined/> : null }
                </div>
              </div>
            </ATooltip>

            <ATooltip title='混合菜单导航'>
              <div
                class='setting-checbox-item'
                onClick={ () => appStore.toggleLayoutMode('mix') }
              >
                <div class='setting-icon bg-light sidemenu-dark topmenu-dark'/>
                <div class='setting-check'>
                  { appStore.isMixMenu ? <CheckOutlined/> : null }
                </div>
              </div>
            </ATooltip>
          </div>
        </div>
      )
    }

    const AThemeComponnets = (props: any) => {
      return (
        <div { ...props }>
          <h3 class='setting-title'>组件风格</h3>
          <div class='setting-components'>
            <ATag
              class='setting-component'
              color={appStore.componentSize === 'small' ? '#1890ff' : '#e3e3e3'}
              onClick={() => appStore.toggleComponentSize('small') }
            >
              <span class='setting-components-tag'>小</span>
            </ATag>

            <ATag
              class='setting-component'
              color={appStore.componentSize === 'middle' ? '#1890ff' : '#e3e3e3'}
              onClick={() => appStore.toggleComponentSize('middle') }
            >
              <span class='setting-components-tag'>中</span>
            </ATag>

            <ATag
              class='setting-component'
              color={appStore.componentSize === 'large' ? '#1890ff' : '#e3e3e3'}
              onClick={() => appStore.toggleComponentSize('large') }
            >
              <span class='setting-components-tag'>大</span>
            </ATag>
          </div>
        </div>
      )
    }

    const AThemeMode = (props: any) => {
      return (
        <div { ...props }>
          <h3 class='setting-title'>主题风格</h3>
          <div class='setting-checbox'>
            <ATooltip title='亮色主题风格'>
              <div
                class='setting-checbox-item'
                onClick={ () => appStore.toggleThemeMode('light') }
              >
                <div class='setting-icon bg-light sidemenu-light topmenu-light'/>
                <div class='setting-check'>
                  { appStore.themeMode === 'light' ? <CheckOutlined/> : null }
                </div>
              </div>
            </ATooltip>

            <ATooltip title='暗色主题风格'>
              <div
                class='setting-checbox-item'
                onClick={ () => appStore.toggleThemeMode('dark') }
              >
                <div class='setting-icon bg-light sidemenu-dark topmenu-light'/>
                <div class='setting-check'>
                  { appStore.themeMode === 'dark' ? <CheckOutlined/> : null }
                </div>
              </div>
            </ATooltip>

            <ATooltip title='暗黑主题风格'>
              <div
                class='setting-checbox-item'
                onClick={ () => appStore.toggleThemeMode('realDark') }
              >
                <div class='setting-icon bg-dark'/>
                <div class='setting-check'>
                  { appStore.themeMode === 'realDark' ? <CheckOutlined/> : null }
                </div>
              </div>
            </ATooltip>
          </div>
        </div>
      )
    }

    const AThemeColors = (props: any) => {
      return (
        <div { ...props }>
          <h3 class='setting-title'>主题颜色</h3>
          <div class='setting-tags'>
            {
              presetThemeColors.map(({ name, color }) => (
                <ATooltip title={name}>
                  <ATag
                    color={color}
                    class='setting-tag'
                    onClick={() => appStore.togglePrimaryColor(color) }
                  >
                    <div class='setting-check'>
                      { appStore.primaryColor === color ? <CheckOutlined/> : null }
                    </div>
                  </ATag>
                </ATooltip>
              ))
            }
          </div>
        </div>
      )
    }

    const ANavigateSettting = (props: any) => {
      const AContentWidth = () => {
        return [
          <ASelect
            size='small'
            value={appStore.contentWidth}
            onChange={(value: any) => appStore.toggleContentWidth(value!)}
          >
            <ASelectOption value='Fixed'>固定</ASelectOption>
            <ASelectOption value='Fluid'>流式</ASelectOption>
          </ASelect>
        ]
      }

      const AFixedHeader = () => {
        return [
          <ASwitch
            size='small'
            checked={appStore.fixedHeader}
            onChange={(value: any) => appStore.toggleFixedHeader(value!)}
          />
        ]
      }

      const AFixedSidebar = () => {
        return [
          <ASwitch
            size='small'
            checked={appStore.fixedSidebar}
            onChange={(value: any) => appStore.toggleFixedSidebar(value!)}
          />
        ]
      }

      const AFixedHeaderTab = () => {
        return [
          <ASwitch
            size='small'
            checked={appStore.fixedHeaderTab}
            onChange={(value: any) => appStore.toggleFixedHeaderTab(value!)}
          />
        ]
      }

      const AHideMixHeaderTab = () => {
        return [
          <ASwitch
            size='small'
            checked={appStore.hideMixHeaderTab}
            onChange={(value: any) => appStore.toggleHideMixHeaderTab(value!)}
          />
        ]
      }

      return (
        <div { ...props }>
          <h3 class='setting-title'>导航设置</h3>
          <div class='setting-navigates'>
            <AList
              split={false}
              size='small'
            >
              <AListItem
                style='padding: 4px 3px; margin: 13px 0 10px;'
                actions={ AContentWidth() }
              >
                <AListItemMeta title='内容区域宽度'/>
              </AListItem>

              <AListItem
                style='padding: 4px 3px; margin: 13px 0 10px;'
                actions={ AFixedHeader() }
              >
                <AListItemMeta title='固定顶部栏导航'/>
              </AListItem>

              <AListItem
                style='padding: 4px 3px; margin: 13px 0 10px;'
                actions={ AFixedSidebar() }
              >
                <AListItemMeta title='固定侧边栏菜单'/>
              </AListItem>

              <AListItem
                style='padding: 4px 3px; margin: 13px 0 10px;'
                actions={ AFixedHeaderTab() }
              >
                <AListItemMeta title='固定导航栏页签'/>
              </AListItem>

              <AListItem
                style='padding: 4px 3px; margin: 13px 0 10px;'
                actions={ AHideMixHeaderTab() }
              >
                <AListItemMeta title='隐藏混合导航栏页签'/>
              </AListItem>
            </AList>
          </div>
        </div>
      )
    }

    const AOtherSettting = (props: any) => {
      const AThemeWeak = () => {
        return [
          <ASwitch
            size='small'
            checked={appStore.themeWeak}
            onChange={(value: any) => appStore.toggleThemeWeak(value!)}
          />
        ]
      }

      const AMultiTab = () => {
        return [
          <ASwitch
            size='small'
            checked={appStore.multiTab}
            onChange={(value: any) => appStore.toggleMultiTab(value!)}
          />
        ]
      }

      const AKeepAlive = () => {
        return [
          <ASwitch
            size='small'
            checked={appStore.keepAlive}
            disabled={!appStore.multiTab}
            onChange={(value: any) => appStore.toggleKeepAlive(value!)}
          />
        ]
      }

      return (
        <div { ...props }>
          <h3 class='setting-title'>其他设置</h3>
          <div class='setting-others'>
            <AList
              split={false}
              size='small'
            >
              <AListItem
                style='padding: 4px 3px; margin: 13px 0 10px;'
                actions={ AThemeWeak() }
              >
                <AListItemMeta title='色弱模式'/>
              </AListItem>

              <AListItem
                style='padding: 4px 3px; margin: 13px 0 10px;'
                actions={ AMultiTab() }
              >
                <AListItemMeta title='多页签模式'/>
              </AListItem>

              <AListItem
                style='padding: 4px 3px; margin: 13px 0 10px;'
                actions={ AKeepAlive() }
              >
                <AListItemMeta title='多页签缓存'/>
              </AListItem>
            </AList>
          </div>
        </div>
      )
    }

    const ANoticeInfo = (props: any) => {
      const info = console.info
      const lookSetting = () => info(`{\n  themeColor: {\n    primaryColor: '${appStore.primaryColor}',\n    warningColor: '${appStore.warningColor}',\n    successColor: '${appStore.successColor}',\n    errorColor: '${appStore.errorColor}',\n    infoColor: '${appStore.infoColor}'\n  },\n  themeWeak: ${appStore.themeWeak},\n  themeMode: '${appStore.themeMode}',\n  layoutMode: '${appStore.layoutMode}',\n  contentWidth: '${appStore.contentWidth}',\n  componentSize: '${appStore.componentSize}',\n  domTitle: '${defaultSettings.domTitle}',\n  language: '${appStore.language}',\n  multiTab: ${appStore.multiTab},\n  keepAlive: ${appStore.keepAlive},\n  fixedHeader: ${appStore.fixedHeader},\n  fixedSidebar: ${appStore.fixedSidebar},\n  fixedHeaderTab: ${appStore.fixedHeaderTab},\n  hideMixHeaderTab: ${appStore.hideMixHeaderTab}\n}`)

      return (
        <div { ...props }>
          <AAlert
            type='warning'
            style={{ marginBottom: '5px', fontSize: '14px', cursor: 'pointer' }}
            onClick={() => lookSetting() }
            message={
              <>
                <span>配置栏应用于开发环境中预览、调试</span>
                <br/>
                <span>点击查看配置 - 游览器console界面</span>
              </>
            }
          />
        </div>
      )
    }

    const ADrawerButton = () => {
      return !visible.value
        ? <SettingOutlined style='color: #ffffff;'/>
        : <CloseOutlined style='color: #ffffff;'/>
    }

    if (isRender) {
      return () => (
        <>
          <ADrawer
            class='layout-setting-drawer'
            width='300'
            placement='right'
            closable={true}
            forceRender={true}
            visible={visible.value}
            bodyStyle={{ padding: '0 20px 10px' }}
            headerStyle={{ padding: '16px 0', direction: 'rtl' }}
            onClose={() => { visible.value = false }}
          >
            <div class='layout-setting-drawer-content'>
              <ALayoutMode style='margin-bottom: 22px;'/>
              <ADivider/>
              <AThemeComponnets/>
              <AThemeMode/>
              <AThemeColors style='margin-bottom: 22px;'/>
              <ADivider/>
              <ANavigateSettting style='margin-bottom: 22px;'/>
              <ADivider/>
              <AOtherSettting style='margin-bottom: 30px;'/>
              <ADivider/>
              <ANoticeInfo/>
            </div>
          </ADrawer>

          <Teleport to='.layout-setting-drawer .ant-drawer-content-wrapper'>
            <div
              class='layout-setting-drawer-button'
              onClick={() => { visible.value = !visible.value }}
            >
              <ADrawerButton/>
            </div>
          </Teleport>
        </>
      )
    }
  }
})
