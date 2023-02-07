import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'

/**
 * Pinia - use persist plugin
 */
export default createPinia().use(piniaPersist)
