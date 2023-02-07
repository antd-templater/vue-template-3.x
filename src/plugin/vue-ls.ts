import Storage from 'vue-ls'

/**
 * Vue-ls 配置
 */
export const StorageOptions = {
  name: 'ls',
  storage: 'local',
  namespace: '__antd_tempate_'
}
export default Storage.useStorage(StorageOptions).ls
