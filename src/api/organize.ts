import { request } from '@/utils/request'

/**
 * 新增组织信息
 */
export function addOrganizeInfo<T = any, D = any>(data: D) {
  return request<T, D>({
    url: '/organize/addOrganizeInfo',
    method: 'post',
    data: data
  })
}

/**
 * 获取组织信息列表
 */
export function getOrganizeInfoList<T = any, D = any>(data: D) {
  return request<T, D>({
    url: '/organize/getOrganizeInfoList',
    method: 'post',
    data: data
  })
}

/**
 * 获取组织Tree列表
 */
export function getOrganizeInfoTree<T = any, D = any>(data: D) {
  return request<T, D>({
    url: '/organize/getOrganizeInfoTree',
    method: 'post',
    data: data
  })
}

/**
 * 修改组织信息
 */
export function modifyOrganizeInfo<T = any, D = any>(data: D) {
  return request<T, D>({
    url: '/organize/modifyOrganizeInfo',
    method: 'post',
    data: data
  })
}

/**
 * 删除组织信息
 */
export function deleteOrganizeInfo<T = any, D = any>(data: D) {
  return request<T, D>({
    url: '/organize/deleteOrganizeInfo',
    method: 'post',
    data: data
  })
}
