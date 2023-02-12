import App from './App.vue'
import AntdTemplatePlugin from '@antd-templater/antd-template-lib3.x'
import DirectivePlugin from '@/configure/presetDirective'
import PiniaUsePlugin from '@/plugin/pinia'
import RouterPlugin from '@/router'

import '@/mock'
import '@/main.less'
import '@/permission'

createApp(App)
  .use(AntdTemplatePlugin)
  .use(DirectivePlugin)
  .use(PiniaUsePlugin)
  .use(RouterPlugin)
  .mount('#app')
