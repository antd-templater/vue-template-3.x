import { request } from '@/utils/request'

/**
 * addRoleInfo 新增角色信息
 * etRoleInfoList 获取所有角色列表
 * getRoleInfoByPages 分页获取角色列表
 * getRoleInfoByUserNo 获取用户角色列表
 * modifyRoleInfo 修改角色信息
 * deleteRoleInfo 删除角色信息
 */
const api = {
  addRoleInfo: '/role/addRoleInfo',
  getRoleInfoList: '/role/getRoleInfoList',
  getRoleInfoByPages: '/role/getRoleInfoByPages',
  getRoleInfoByUserNo: '/role/getRoleInfoByUserNo',
  modifyRoleInfo: '/role/modifyRoleInfo',
  deleteRoleInfo: '/role/deleteRoleInfo'
}

export function addRoleInfo<T = any, D = any>(data: D) {
  return request<T, D>({
    url: api.addRoleInfo,
    method: 'post',
    data: data
  })
}

export function getRoleInfoList<T = any, D = any>(data: D) {
  return request<T, D>({
    url: api.getRoleInfoList,
    method: 'post',
    data: data
  })
}

export function getRoleInfoByPages<T = any, D = any>(data: D) {
  return request<T, D>({
    url: api.getRoleInfoByPages,
    method: 'post',
    data: data
  })
}

export function getRoleInfoByUserNo<T = any, D = any>(data: D) {
  return request<T, D>({
    url: api.getRoleInfoByUserNo,
    method: 'post',
    data: data
  })
}

export function modifyRoleInfo<T = any, D = any>(data: D) {
  return request<T, D>({
    url: api.modifyRoleInfo,
    method: 'post',
    data: data
  })
}

export function deleteRoleInfo<T = any, D = any>(data: D) {
  return request<T, D>({
    url: api.deleteRoleInfo,
    method: 'post',
    data: data
  })
}

export default api
