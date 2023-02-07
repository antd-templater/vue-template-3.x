import { request } from '@/utils/request'

/**
 * addOrganizeInfo 新增组织信息
 * getOrganizeInfoList 获取组织信息列表
 * getOrganizeInfoTree 获取组织Tree列表
 * modifyOrganizeInfo 修改组织信息
 * deleteOrganizeInfo 删除组织信息
 */
const api = {
  addOrganizeInfo: '/organize/addOrganizeInfo',
  getOrganizeInfoList: '/organize/getOrganizeInfoList',
  getOrganizeInfoTree: '/organize/getOrganizeInfoTree',
  modifyOrganizeInfo: '/organize/modifyOrganizeInfo',
  deleteOrganizeInfo: '/organize/deleteOrganizeInfo'
}

export function addOrganizeInfo<T = any, D = any>(data: D) {
  return request<T, D>({
    url: api.addOrganizeInfo,
    method: 'post',
    data: data
  })
}

export function getOrganizeInfoList<T = any, D = any>(data: D) {
  return request<T, D>({
    url: api.getOrganizeInfoList,
    method: 'post',
    data: data
  })
}

export function getOrganizeInfoTree<T = any, D = any>(data: D) {
  return request<T, D>({
    url: api.getOrganizeInfoTree,
    method: 'post',
    data: data
  })
}

export function modifyOrganizeInfo<T = any, D = any>(data: D) {
  return request<T, D>({
    url: api.modifyOrganizeInfo,
    method: 'post',
    data: data
  })
}

export function deleteOrganizeInfo<T = any, D = any>(data: D) {
  return request<T, D>({
    url: api.deleteOrganizeInfo,
    method: 'post',
    data: data
  })
}

export default api
