<template>
  <section class="organize-drawer-container">
    <ADrawer
      width="400"
      :zIndex="1010"
      :title="title"
      :visible="visible"
      :forceRender="true"
      :maskClosable="true"
      :destroyOnClose="false"
      placement="right"
      @close="doClose()"
    >
      <RoleForm
        ref="form"
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
const visible = ref(false)
const readonly = ref(false)
const disabled = ref(false)
const loading = ref(false)
const isAdd = ref(false)

const doEdit = (data: any) => {
  title.value = '修改角色'
  action.value = 'update'
  readonly.value = false
  isAdd.value = false

  record.value = Object.assign(
    { activity: 'Y' },
    data
  )

  if (form.value) {
    form.value.doCreate('update', record.value)
    visible.value = true
  }
}

const doAdd = (data: any) => {
  title.value = '添加角色'
  action.value = 'insert'
  readonly.value = false
  isAdd.value = true

  record.value = Object.assign(
    { activity: 'Y' },
    data
  )

  if (form.value) {
    form.value.doCreate('insert', record.value)
    visible.value = true
  }
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
