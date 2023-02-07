import { request } from '@/utils/request'

/**
 * addUserInfo 新增用户信息
 * getUserInfo 获取用户信息
 * getUserMenu 获取用户菜单
 * getUserInfoList 获取用户列表
 * modifyUserInfo 修改用户信息
 * deleteUserInfo 删除用户信息
 */
const api = {
  addUserInfo: '/user/addUserInfo',
  getUserInfo: '/user/getUserInfo',
  getUserMenu: '/user/getUserMenu',
  getUserInfoList: '/user/getUserInfoList',
  modifyUserInfo: '/user/modifyUserInfo',
  deleteUserInfo: '/user/deleteUserInfo'
}

export function addUserInfo<T = any, D = any>(data: D) {
  return request<T, D>({
    url: api.addUserInfo,
    method: 'post',
    data: data
  })
}

export function getUserInfo<T = any, D = any>(data: D) {
  return request<T, D>({
    url: api.getUserInfo,
    method: 'post',
    data: data
  })
}

export function getUserMenu<T = any, D = any>(data: D) {
  return request<T, D>({
    url: api.getUserMenu,
    method: 'post',
    data: data
  })
}

export function getUserInfoList<T = any, D = any>(data: D) {
  return request<T, D>({
    url: api.getUserInfoList,
    method: 'post',
    data: data
  })
}

export function modifyUserInfo<T = any, D = any>(data: D) {
  return request<T, D>({
    url: api.modifyUserInfo,
    method: 'post',
    data: data
  })
}

export function deleteUserInfo<T = any, D = any>(data: D) {
  return request<T, D>({
    url: api.deleteUserInfo,
    method: 'post',
    data: data
  })
}

export default api
