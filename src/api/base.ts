import { request } from '@/utils/request'

/**
 * getOptionById 查询 Option 下拉框
 * getTreeById 查询 Tree 下拉框
 */
const api = {
  getOptionById: '/base/getOptionById',
  getTreeById: '/base/getTreeById'
}

export function getOptionById<T = any>(data: any) {
  return request<T>({
    url: api.getOptionById,
    method: 'post',
    data: data
  })
}

export function getTreeById<T = any>(data: any) {
  return request<T>({
    url: api.getTreeById,
    method: 'post',
    data: data
  })
}

export default api
