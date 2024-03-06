import { request } from '@/utils/request'

/**
 * 系统登录
 */
export function login<T = any, D = any>(data: D) {
  return request<T, D>({
    url: '/auth/login',
    method: 'post',
    data: data
  })
}

/**
 * 系统退出
 */
export function logout<T = any, D = any>(data: D) {
  return request<T, D>({
    url: '/auth/logout',
    method: 'post',
    data: data
  })
}

/**
 * 修改密码
 */
export function modifyPassword<T = any, D = any>(data: D) {
  return request<T, D>({
    url: '/auth/modifyPassword',
    method: 'post',
    data: data
  })
}

/**
 * 获取登录用户
 */
export function loginUserInfo<T = any, D = any>(data: D) {
  return request<T, D>({
    url: '/auth/loginUserInfo',
    method: 'post',
    data: data
  })
}

/**
 * 获取用户菜单
 */
export function loginUserMenu<T = any, D = any>(data: D) {
  return request<T, D>({
    url: '/auth/loginUserMenu',
    method: 'post',
    data: data
  })
}
