import { reactive } from 'vue'

/**
 * Mock 请求配置
 */
export default defineStore('mock', () => {
  const request = reactive({ headers: {} as Record<string, any> })
  const headers = computed(() => request.headers)

  const update = (headers: any) => {
    request.headers = headers
  }

  return {
    headers,
    update
  }
})
