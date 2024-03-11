import { defineStore } from 'pinia'
import { Ref, ref, computed } from 'vue'
import defaultAvatar from '@/assets/avatar/default_avatar.png?url'
import useTagStore from '@/store/tag'
import * as authApi from '@/api/auth'

/**
 * User 用户管理
 */
export default defineStore('user', () => {
  const token = ref('')
  const userNo = ref('')
  const userName = ref('')
  const mobilePhone = ref('')
  const avatar = ref(defaultAvatar)
  const orgId = ref('')
  const orgName = ref('')
  const deptId = ref('')
  const deptName = ref('')
  const dataFlag = ref('')
  const userInfo = ref({}) as Ref<UserInfo>
  const userRole = ref({}) as Ref<UserRole>
  const nickname = computed(() => userName.value)
  const tagStore = useTagStore()
  const logined = ref(false)

  const login = async(params: Record<string, any> = {}) => {
    if (tagStore) {
      tagStore.delAllTags()
    }

    if (logined.value) {
      logined.value = false
    }

    interface CustomResult {
      token: string;
      data: UserInfo;
    }

    return authApi.login<CustomResult>(params).then(res => {
      if (res.code !== '0000') {
        return Promise.reject(res)
      }

      const result = res.result || {}
      const data = result.data

      token.value = result.token
      userNo.value = data?.userNo || ''
      userName.value = data?.userName || ''
      mobilePhone.value = data?.mobilePhone || ''
      orgId.value = data?.orgId || ''
      orgName.value = data?.orgName || ''
      deptId.value = data?.deptId || ''
      deptName.value = data?.deptName || ''

      return res
    })
  }

  const logout = async(params: Record<string, any> = {}) => {
    if (tagStore) {
      tagStore.delAllTags()
    }

    token.value = ''
    userNo.value = ''
    userName.value = ''
    orgId.value = ''
    orgName.value = ''
    deptId.value = ''
    deptName.value = ''
    dataFlag.value = ''
    avatar.value = defaultAvatar
    userInfo.value = {} as UserInfo
    userRole.value = {} as UserRole
    logined.value = false

    return authApi.logout(params).then(res => {
      if (res.code !== '0000') {
        return Promise.reject(res)
      }
    })
  }

  const loginUserInfo = async(params: Record<string, any> = {}) => {
    return authApi.loginUserInfo<UserInfo>(params).then(res => {
      if (res.code !== '0000') {
        return Promise.reject(new Error(res.message || '获取用户失败!'))
      }

      const result = res.result

      userInfo.value = result || userInfo.value
      userRole.value = result.role || userRole.value
      userNo.value = result.userNo || userNo.value
      userName.value = result.userName || userName.value
      avatar.value = result.avatar || avatar.value
      orgId.value = result.orgId || orgId.value
      orgName.value = result.orgName || orgName.value
      deptId.value = result.deptId || deptId.value
      deptName.value = result.deptName || deptName.value
      dataFlag.value = result.dataFlag || dataFlag.value

      if (userRole.value && userRole.value.permissions) {
        for (const permission of userRole.value.permissions) {
          if (permission.actionEntitySet) {
            permission.actionList = permission.actionEntitySet.map(action => action.action)
          }
        }
        userRole.value.permissionList = userRole.value.permissions.map(permission => permission.permissionId)
      }

      logined.value = true

      return res
    })
  }

  return {
    token,
    userNo,
    userName,
    mobilePhone,
    avatar,
    orgId,
    orgName,
    deptId,
    deptName,
    dataFlag,
    userInfo,
    userRole,
    nickname,
    logined,

    login,
    logout,
    loginUserInfo
  }
}, {
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage,
        key: 'STORE-TOKEN',
        paths: ['token']
      },
      {
        storage: localStorage,
        key: 'STORE-ORG-ID',
        paths: ['orgId']
      },
      {
        storage: localStorage,
        key: 'STORE-USER-NO',
        paths: ['userNo']
      }
    ]
  }
})
