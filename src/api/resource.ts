import { request } from '@/utils/request'

/**
 * 新增资源信息
 */
export function addResourceInfo<T = any, D = any>(data: D) {
  return request<T, D>({
    url: '/resource/addResourceInfo',
    method: 'post',
    data: data,
  })
}

/**
 * 查询资源信息
 */
export function getResourceListInfo<T = any, D = any>(data: D) {
  return request<T, D>({
    url: '/resource/getResourceListInfo',
    method: 'post',
    data: data,
  })
}

/**
 * 查询所有菜单资源
 */
export function getResourceTreeInfo<T = any, D = any>(data: D) {
  return request<T, D>({
    url: '/resource/getResourceTreeInfo',
    method: 'post',
    data: data,
  })
}

/**
 * 根据角色查询菜单资源
 */
export function getResourceMenuByRole<T = any, D = any>(data: D) {
  return request<T, D>({
    url: '/resource/getResourceMenuByRole',
    method: 'post',
    data: data,
  })
}

/**
 * 根据角色查询按钮资源
 */
export function getResourceButtonByRole<T = any, D = any>(data: D) {
  return request<T, D>({
    url: '/resource/getResourceButtonByRole',
    method: 'post',
    data: data,
  })
}

/**
 * 修改角色资源配置
 */
export function modifyResoureInfoByRole<T = any, D = any>(data: D) {
  return request<T, D>({
    url: '/resource/modifyResoureInfoByRole',
    method: 'post',
    data: data,
  })
}

/**
 * 修改资源信息
 */
export function modifyResourceInfo<T = any, D = any>(data: D) {
  return request<T, D>({
    url: '/resource/modifyResourceInfo',
    method: 'post',
    data: data,
  })
}

/**
 * 删除资源信息
 */
export function deleteResourceInfo<T = any, D = any>(data: D) {
  return request<T, D>({
    url: '/resource/deleteResourceInfo',
    method: 'post',
    data: data,
  })
}
