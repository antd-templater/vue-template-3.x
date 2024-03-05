import { requestBuilder } from '@/utils/common'
import defaultRouter from '@/configure/defaultRouter'
import * as userApi from '@/api/user'

import type {
  Menu,
  Route,
  ListToTree,
  TreeToRoute,
  ReqiredRoute,
  GenerateDynamicPath,
  GenerateDynamicComponent,
  GenerateDynamicRouter,
  GenerateLayoutRouter,
  GenerateViewsRouter
} from './generate-typing'

/**
 * 转换树形结构
 */
const listToTree: ListToTree = (list, chidren, parent) => {
  list.forEach(item => {
    if (item.parentId === parent.id) {
      const menu = { ...item, children: [] as any }

      listToTree(list, menu.children, item)

      if (menu.children.length <= 0) {
        delete menu.children
      }

      chidren.push(menu)
    }
  })

  chidren.sort((next, prev) => {
    const nextSort = next.sort === Infinity || Number.isFinite(+next.sort!) ? next.sort! : -1
    const prevSort = prev.sort === Infinity || Number.isFinite(+prev.sort!) ? prev.sort! : -1
    return nextSort - prevSort < 0 ? -1 : nextSort - prevSort > 0 ? 1 : 0
  })
}

/**
 * 转换层级路由表
 */
const treeToRoute: TreeToRoute = (trees, parent = {}, components = {}) => {
  return trees.map(item => {
    const {
      icon,
      title,
      target,
      allowCache,
      hideInMenu,
      hideChildInMenu
    } = item.meta || {}

    const parentAllowCache = parent.meta?.allowCache
    const isFrameView = item.component === 'PageFrame'
    const match = item.component === 'PageFrame' ? 'external' : 'path'

    const currentRouter: ReqiredRoute = {
      id: item.id,
      name: item.name || '',
      path: generateDynamicPath(parent, item),
      component: generateDynamicComponent(parent, item, components),
      redirect: item.redirect && item.redirect.trim(),

      meta: {
        icon: icon,
        title: title,
        match: match,
        target: target,
        groupId: (parent.meta || {}).groupId || item.id,
        external: isFrameView && item.path || '',
        componentName: item.component || item.name || '',
        hideChildInMenu: hideInMenu === true || hideInMenu === 'Y' || hideChildInMenu === true || hideChildInMenu === 'Y',
        allowCache: (parentAllowCache !== false && parentAllowCache !== 'N') || (allowCache !== false && allowCache !== 'N'),
        hideInMenu: hideInMenu === true || hideInMenu === 'Y',
        permission: item.name && [item.name] || []
      }
    }

    // 无效图标
    if (!icon) {
      delete currentRouter.meta.icon
    }

    // Frame 使用别名
    if (isFrameView) {
      currentRouter.path = currentRouter.path.replace(/\/+$/, '') + '/:path(.*)?'
    }

    // 无效重定向
    if (!currentRouter.redirect) {
      delete currentRouter.redirect
    }

    // Path 规范化处理
    if (!currentRouter.path.startsWith('http')) {
      currentRouter.path = currentRouter.path.replace(/^\/+/, '/')
    }

    // 是否有子菜单，并递归处理
    if (item.children && item.children.length > 0) {
      currentRouter.children = treeToRoute(
        item.children,
        currentRouter,
        components
      )
    }

    // 是否设置隐藏子菜单
    if (!currentRouter.meta.hideChildInMenu && currentRouter.children?.every(route => route.meta && route.meta.hideInMenu)) {
      currentRouter.meta.hideChildInMenu = true
    }

    // 路由表
    return currentRouter
  })
}

/**
 * 动态生成路径
 */
export const generateDynamicPath: GenerateDynamicPath = (parent = {}, item = {}) => {
  const end = /.+\/+$/g
  const start = /^\/*([^/].*)/
  const namePath = item.name?.replace(end, '')
  const itemPath = item.path?.replace(end, '')
  const parentPath = parent.path?.replace(end, '')
  const isUseMergePath = item.component === 'PageFrame' || !itemPath || false

  return isUseMergePath && parentPath && namePath
    ? (parentPath + '/' + namePath).replace(start, '/$1')
    : itemPath || ''
}

/**
 * 动态加载组件
 */
export const generateDynamicComponent: GenerateDynamicComponent = (parent = {}, item = {}, components = {}) => {
  // 组件路径
  const regex = /^.+\/+$/g
  const itemPath = item.path?.replace(regex, '') || ''
  const parentPath = parent.path?.replace(regex, '') || ''
  const tempViewPath = itemPath?.startsWith('/') ? itemPath : parentPath + '/' + itemPath
  const currentPath = tempViewPath.replace(/^\/*([^/].*)/, '/$1')
  const importrMaps = import.meta.glob('@/views/**/*.vue')

  // Component
  if (String(item.component) !== item.component) {
    return item.component
  }

  // Layout
  if (components[item.component]) {
    return components[item.component]
  }

  // Views
  if (components[currentPath]) {
    return components[currentPath]
  }

  // Matching
  const viewSuffix = '.vue'
  const viewPrefix = `/src/views`
  const viewPartPath = currentPath.replace(/^\/+|\.vue$/gi, '')
  return importrMaps[`${viewPrefix}/${viewPartPath}${viewSuffix}`]
}

/**
 * 动态生成菜单
 */
export const generateDynamicRouter: GenerateDynamicRouter = (params, components, isServer = true) => {
  const requester = () => userApi.getUserMenu<Menu[]>(requestBuilder('generateRoutes', params))
  const resolver = () => Promise.resolve({ code: '0000', message: null, result: [] })
  const promise = isServer ? requester() : resolver()

  return promise.then(res => {
    if (res.code !== '0000') {
      return Promise.reject(res)
    }

    // 创建节点组
    const result = res.result
    const rootRoute = defaultRouter.rootRoute
    const externalRoute = defaultRouter.externalRoute
    const notFoundRoutes = defaultRouter.notFoundRoutes
    const children = JSON.parse(JSON.stringify(rootRoute.children)) as Menu[]

    // 生成树型数组
    listToTree(result, children, { id: '0' })

    // 生成路由表
    const trees: Menu[] = [{ ...rootRoute, children }]
    const routers = treeToRoute(trees, {}, components)

    // 添加静态路由
    routers[0].children?.unshift(externalRoute)
    routers.push(...notFoundRoutes)

    // 菜单路由
    return routers
  })
}

/**
 * 布局页面路由生成器
 */
export const generateLayoutRouter: GenerateLayoutRouter = contexts => {
  const routerComponents: Record<string, any> = {}
  const replaceKeyRegex = /^.*\/src\/layout\/(([^/]+\/?)+)\.(tsx|vue)$/
  const ignoreKeyRegex = /^_.*|^\..*/

  for (const [path, value] of Object.entries(contexts)) {
    const key = path.replace(replaceKeyRegex, '$1')
    const ignore = ignoreKeyRegex.test(key)

    if (!ignore && !routerComponents[key]) {
      routerComponents[key] = value.default || value
    }
  }
  return routerComponents
}

/**
 * 业务页面路由生成器
 */
export const generateViewsRouter: GenerateViewsRouter = contexts => {
  const routerComponents: Record<string, () => Promise<any>> = {}
  const replaceKeyRegex = /^.*\/src\/views(\/([^/]+\/?)+)\.(tsx|vue)$/
  const ignoreKeyRegex = /^_.*|^\..*/

  for (const [path, value] of Object.entries(contexts)) {
    const key = path.replace(replaceKeyRegex, '$1')
    const ignore = ignoreKeyRegex.test(key)

    if (!ignore && !routerComponents[key]) {
      routerComponents[key] = value
    }
  }
  return routerComponents
}

/**
 * 导出声明
 */
export type {
  Menu,
  Route,
  ListToTree,
  TreeToRoute,
  ReqiredRoute,
  GenerateDynamicPath,
  GenerateDynamicComponent,
  GenerateDynamicRouter,
  GenerateLayoutRouter,
  GenerateViewsRouter
}
