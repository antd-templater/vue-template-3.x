<template>
  <section class="user-drawer-container">
    <ADrawer
      width="400"
      :zIndex="1010"
      :title="title"
      :visible="visible"
      :forceRender="false"
      :maskClosable="true"
      :destroyOnClose="true"
      placement="right"
      @close="doClose()"
    >
      <UserForm
        ref="form"
        :presetOptions="props.presetOptions"
        :disabled="disabled"
        :readonly="readonly"
        :loading="loading"
      />

      <div class="drawer-footer">
        <div class="footer-fixed">
          <AButton @click="doClose()">
            取消
          </AButton>

          <AButton
            type="primary"
            :loading="loading"
            @click="doSubmit()"
          >
            保存
          </AButton>
        </div>
      </div>
    </ADrawer>
  </section>
</template>

<script setup lang="ts">
import Notification from 'ant-design-vue/es/notification'
import { requestBuilder } from '@/utils/common'
import * as userApi from '@/api/user'

export interface Props {
  presetOptions: {
    orgTree: any[];
    deptId: any[];
    roleId: any[];
  }
}

import UserForm from './UserForm.vue'

export interface Emits{
  (e: 'submitted'): void;
  (e: 'closed'): void;
}

defineOptions({
  name: 'UserDrawer',
  inheritAttrs: false
})

const props = defineProps<Props>()
const emits = defineEmits<Emits>()
const form = ref(null as InstanceType<typeof UserForm> | null)

const title = ref('')
const action = ref('')
const record = ref({} as Record<string, any>)
const visible = ref(false)
const readonly = ref(false)
const disabled = ref(false)
const loading = ref(false)
const isAdd = ref(false)

const doEdit = (data: any) => {
  title.value = '修改用户'
  action.value = 'update'
  readonly.value = false
  visible.value = true
  isAdd.value = false

  record.value = Object.assign(
    { activity: 'Y' },
    data
  )
  nextTick(() => {
    form.value?.doCreate('update', record.value)
  })
}

const doAdd = (data: any) => {
  title.value = '新增用户'
  action.value = 'insert'
  readonly.value = false
  visible.value = true
  isAdd.value = true

  record.value = Object.assign(
    { activity: 'Y' },
    data
  )

  nextTick(() => {
    form.value?.doCreate('insert', record.value)
  })
}

const doSubmit = () => {
  form.value?.validateFields()?.then(({ action, record }) => {
    if (!loading.value) {
      loading.value = true

      const notice = {
        error: action === 'insert' ? '新增失败!' : '更新失败!',
        success: action === 'insert' ? '新增成功!' : '更新成功!'
      }

      const promise = action === 'insert'
        ? userApi.addUserInfo(requestBuilder(action, record))
        : userApi.modifyUserInfo(requestBuilder(action, record))

      promise.finally(() => {
        loading.value = false
      })

      return promise.then(res => {
        res.code !== '0000'
          ? Notification.error({ message: '系统消息', description: res.message || notice.error })
          : Notification.success({ message: '系统消息', description: notice.success })

        const promise = res.code !== '0000'
          ? Promise.reject(res)
          : record

        emits('submitted')
        doClose()

        return promise
      })
    }
  })
}

const doClose = () => {
  if (visible.value) {
    title.value = ''
    action.value = ''
    record.value = {}
    disabled.value = false
    readonly.value = false
    loading.value = false
    visible.value = false
    isAdd.value = false

    form.value?.doClose()
    emits('closed')
  }
}

defineExpose({
  doEdit,
  doAdd
})
</script>

<style lang="less" scoped>
</style>
