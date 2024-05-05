import { request } from '@/utils/request'

/**
 * 查询 Option 下拉框
 */
export function getOptionById<T = any>(data: any) {
  return request<T>({
    url: '/base/getOptionById',
    method: 'post',
    data: data,
  })
}

/**
 * 查询 Tree 下拉框
 */
export function getTreeById<T = any>(data: any) {
  return request<T>({
    url: '/base/getTreeById',
    method: 'post',
    data: data,
  })
}
