import { request } from '@/utils/request'

/**
 * addResourceInfo 新增资源信息
 * getResourceInfoList 查询资源信息
 * getResourceMenuAll 查询所有菜单资源
 * getResourceMenuByRole 根据角色查询菜单资源
 * getResourceButtonByRole 根据角色查询按钮资源
 * modifyResoureInfoByRoleId 修改角色资源配置
 * modifyResourceInfo 修改资源信息
 * deleteResourceInfo 删除资源信息
 */
const api = {
  addResourceInfo: '/resource/addResourceInfo',
  getResourceInfoList: '/resource/getResourceInfoList',
  getResourceMenuAll: '/resource/getResourceMenuAll',
  getResourceMenuByRole: '/resource/getResourceMenuByRole',
  getResourceButtonByRole: '/resource/getResourceButtonByRole',
  modifyResoureInfoByRoleId: '/resource/modifyResoureInfoByRoleId',
  modifyResourceInfo: '/resource/modifyResourceInfo',
  deleteResourceInfo: '/resource/deleteResourceInfo'
}

export function addResourceInfo<T = any, D = any>(data: D) {
  return request<T, D>({
    url: api.addResourceInfo,
    method: 'post',
    data: data
  })
}

export function getResourceInfoList<T = any, D = any>(data: D) {
  return request<T, D>({
    url: api.getResourceInfoList,
    method: 'post',
    data: data
  })
}

export function getResourceMenuAll<T = any, D = any>(data: D) {
  return request<T, D>({
    url: api.getResourceMenuAll,
    method: 'post',
    data: data
  })
}

export function getResourceMenuByRole<T = any, D = any>(data: D) {
  return request<T, D>({
    url: api.getResourceMenuByRole,
    method: 'post',
    data: data
  })
}

export function getResourceButtonByRole<T = any, D = any>(data: D) {
  return request<T, D>({
    url: api.getResourceButtonByRole,
    method: 'post',
    data: data
  })
}

export function modifyResoureInfoByRoleId<T = any, D = any>(data: D) {
  return request<T, D>({
    url: api.modifyResoureInfoByRoleId,
    method: 'post',
    data: data
  })
}

export function modifyResourceInfo<T = any, D = any>(data: D) {
  return request<T, D>({
    url: api.modifyResourceInfo,
    method: 'post',
    data: data
  })
}

export function deleteResourceInfo<T = any, D = any>(data: D) {
  return request<T, D>({
    url: api.deleteResourceInfo,
    method: 'post',
    data: data
  })
}

export default api
