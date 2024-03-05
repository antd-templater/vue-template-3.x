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
