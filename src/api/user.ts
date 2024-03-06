import { request } from '@/utils/request'

/**
 * 新增用户信息
 */
export function addUserInfo<T = any, D = any>(data: D) {
  return request<T, D>({
    url: '/user/addUserInfo',
    method: 'post',
    data: data
  })
}

/**
 * 获取用户列表
 */
export function getUserInfoList<T = any, D = any>(data: D) {
  return request<T, D>({
    url: '/user/getUserInfoList',
    method: 'post',
    data: data
  })
}

/**
 * 修改用户信息
 */
export function modifyUserInfo<T = any, D = any>(data: D) {
  return request<T, D>({
    url: '/user/modifyUserInfo',
    method: 'post',
    data: data
  })
}

/**
 * 删除用户信息
 */
export function deleteUserInfo<T = any, D = any>(data: D) {
  return request<T, D>({
    url: '/user/deleteUserInfo',
    method: 'post',
    data: data
  })
}
