import App from './App.vue'
import Message from 'ant-design-vue/es/message'
import Notification from 'ant-design-vue/es/notification'
import AntdComponents from '@antd-templater/antd-template-lib3.x'
import MagicModifyPlugin from '@/configure/presetMagicModify'
import DirectivePlugin from '@/configure/presetDirective'
import PiniaterPlugin from '@/plugin/pinia'
import RouterPlugin from '@/router'

import '@/mock'
import '@/main.less'
import '@/permission'

Notification.config({ duration: 1 })
Message.config({ duration: 1 })

createApp(App)
  .use(AntdComponents)
  .use(MagicModifyPlugin)
  .use(DirectivePlugin)
  .use(PiniaterPlugin)
  .use(RouterPlugin)
  .mount('#app')
