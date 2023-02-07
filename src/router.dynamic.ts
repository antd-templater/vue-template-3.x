import { generateLayoutRouter, generateViewsRouter } from '@/router/generate-routes'

/**
 * 动态路由映射
 */
export default {
  ...generateLayoutRouter(import.meta.glob('@/layout/*.{tsx,vue}', { eager: true })),
  ...generateViewsRouter(import.meta.glob('@/views/**/*.{tsx,vue}', { eager: false }))
}
