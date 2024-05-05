import { Ref, ref } from 'vue'
import { Route, generateDynamicRouter } from '@/router/generate-routes'
import defaultRouter from '@/configure/defaultRouter'

/**
 * Router 路由管理
 */
export default defineStore('router', () => {
  const dynamicRoutes: Ref<Route[]> = ref([])
  const constantRoutes: Ref<Route[]> = ref(defaultRouter.constantRoutes)

  const generateRouter = async(params: Record<string, any>, components: Record<string, any>, isServer = true) => {
    dynamicRoutes.value = await generateDynamicRouter(params, components, isServer)
  }

  return {
    dynamicRoutes,
    constantRoutes,
    generateRouter,
  }
})
