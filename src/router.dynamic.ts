import { generateLayoutRouter } from '@/router/generate-routes'
import { generateViewsRouter } from '@/router/generate-routes'

/**
 * 动态路由映射
 */
export default {
  ...generateViewsRouter(import.meta.glob(['@/views/**/*.vue', '!@/views/**/components/**/*.vue'], { eager: false })),
  ...generateLayoutRouter(import.meta.glob(['@/layout/*.{tsx,vue}'], { eager: true }))
}
