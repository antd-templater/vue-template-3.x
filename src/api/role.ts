import { request } from '@/utils/request'

/**
 * 新增角色信息
 */
export function addRoleInfo<T = any, D = any>(data: D) {
  return request<T, D>({
    url: '/role/addRoleInfo',
    method: 'post',
    data: data
  })
}

/**
 * 获取所有角色列表
 */
export function getRoleInfoList<T = any, D = any>(data: D) {
  return request<T, D>({
    url: '/role/getRoleInfoList',
    method: 'post',
    data: data
  })
}

/**
 * 分页获取角色列表
 */
export function getRoleInfoByPages<T = any, D = any>(data: D) {
  return request<T, D>({
    url: '/role/getRoleInfoByPages',
    method: 'post',
    data: data
  })
}

/**
 * 获取用户角色列表
 */
export function getRoleInfoByUserNo<T = any, D = any>(data: D) {
  return request<T, D>({
    url: '/role/getRoleInfoByUserNo',
    method: 'post',
    data: data
  })
}

/**
 * 修改角色信息
 */
export function modifyRoleInfo<T = any, D = any>(data: D) {
  return request<T, D>({
    url: '/role/modifyRoleInfo',
    method: 'post',
    data: data
  })
}

/**
 * 删除角色信息
 */
export function deleteRoleInfo<T = any, D = any>(data: D) {
  return request<T, D>({
    url: '/role/deleteRoleInfo',
    method: 'post',
    data: data
  })
}
