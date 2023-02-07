import App from './App.vue'
import ComponentsPlugin from '@/configure/presetComponents'
import DirectivePlugin from '@/configure/presetDirective'
import PiniaUsePlugin from '@/plugin/pinia'
import RouterPlugin from '@/router'

import '@/mock'
import '@/main.less'
import '@/permission'

createApp(App)
  .use(ComponentsPlugin)
  .use(DirectivePlugin)
  .use(PiniaUsePlugin)
  .use(RouterPlugin)
  .mount('#app')
