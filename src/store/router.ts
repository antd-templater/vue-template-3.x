import { Ref, ref } from 'vue'
import { Route, generateDynamicRouter } from '@/router/generate-routes'
import defaultRouter from '@/configure/defaultRouter'

/**
 * 路由管理
 */
export default defineStore('router', () => {
  const dynamicRoutes: Ref<Route[]> = ref([])
  const constantRoutes: Ref<Route[]> = ref(defaultRouter.constantRoutes)

  const generateRouter = async(params: any, components: any) => {
    dynamicRoutes.value = await generateDynamicRouter(params, components)
  }

  return {
    dynamicRoutes,
    constantRoutes,
    generateRouter
  }
})
