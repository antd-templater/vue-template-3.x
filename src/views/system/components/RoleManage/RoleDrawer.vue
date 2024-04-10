<template>
  <section class="role-drawer-container">
    <ADrawer
      width="400"
      :open="open"
      :title="title"
      :zIndex="1010"
      :forceRender="false"
      :maskClosable="true"
      :destroyOnClose="true"
      placement="right"
      @close="doClose()"
    >
      <RoleForm
        ref="form"
        :disabled="disabled"
        :readonly="readonly"
        :loading="loading"
      />

      <div class="drawer-body-footer">
        <div class="drawer-body-footer-fixed">
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
import * as roleApi from '@/api/role'

import RoleForm from './RoleForm.vue'

export interface Emits{
  (e: 'submitted'): void;
  (e: 'closed'): void;
}

defineOptions({
  name: 'RoleDrawer',
  inheritAttrs: false
})

const emits = defineEmits<Emits>()
const form = ref(null as InstanceType<typeof RoleForm> | null)

const title = ref('')
const action = ref('')
const record = ref({} as Record<string, any>)
const readonly = ref(false)
const disabled = ref(false)
const loading = ref(false)
const isAdd = ref(false)
const open = ref(false)

const doEdit = (data: any) => {
  title.value = '修改角色'
  action.value = 'update'
  disabled.value = false
  readonly.value = false
  isAdd.value = false
  open.value = true

  record.value = Object.assign(
    { activity: 'Y' },
    data
  )

  nextTick(() => {
    form.value?.doCreate('update', record.value)
  })
}

const doAdd = (data: any) => {
  title.value = '添加角色'
  action.value = 'insert'
  disabled.value = false
  readonly.value = false
  isAdd.value = true
  open.value = true

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
        ? roleApi.addRoleInfo(requestBuilder(action, record))
        : roleApi.modifyRoleInfo(requestBuilder(action, record))

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
  if (open.value) {
    title.value = ''
    action.value = ''
    record.value = {}
    disabled.value = false
    readonly.value = false
    loading.value = false
    isAdd.value = false
    open.value = false

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
