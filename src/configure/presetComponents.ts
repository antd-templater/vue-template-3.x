import { App } from 'vue'
import * as Icons from '@ant-design/icons-vue'

/**
 * @Icons @ant-design/icons-vue
 */
export default (app: App) => {
  for (const [name, component] of Object.entries(Icons)) {
    app.component(name, component)
  }
}
