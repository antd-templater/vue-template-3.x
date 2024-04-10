<template>
  <section class="resource-menu-drawer-container">
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
      <div class="readonly-container">
        <div class="readonly-item">
          <span class="name">当前菜单ID:</span>
          <span class="value">{{ record.resourceId || '由系统生成' }}</span>
        </div>
        <div class="readonly-item">
          <span class="name">父级菜单ID:</span>
          <span class="value">{{ record.parentId }}</span>
        </div>
      </div>

      <ADivider :dashed="true" />

      <MenuForm
        ref="form"
        nuForm
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
import * as resourceApi from '@/api/resource'

import MenuForm from './MenuForm.vue'

export interface Emits{
  (e: 'submitted'): void;
  (e: 'deleted'): void;
  (e: 'closed'): void;
}

defineOptions({
  name: 'ResourceMenuDrawer',
  inheritAttrs: false
})

const emits = defineEmits<Emits>()
const form = ref(null as InstanceType<typeof MenuForm> | null)

const title = ref('')
const action = ref('')
const record = ref({} as Record<string, any>)
const readonly = ref(false)
const disabled = ref(false)
const loading = ref(false)
const isAdd = ref(false)
const open = ref(false)

const doEdit = (data: any) => {
  title.value = '修改菜单资源'
  action.value = 'update'
  disabled.value = false
  readonly.value = false
  isAdd.value = false
  open.value = true

  record.value = Object.assign(
    {
      allowCache: 'Y',
      hideInMenu: 'N',
      hideChildInMenu: 'N',
      resourceType: 'm',
      activity: 'Y'
    },
    data
  )

  nextTick(() => {
    form.value?.doCreate('update', record.value)
  })
}

const doAdd = (data: any) => {
  title.value = '添加菜单资源'
  action.value = 'insert'
  disabled.value = false
  readonly.value = false
  isAdd.value = true
  open.value = true

  record.value = Object.assign(
    {
      allowCache: 'Y',
      hideInMenu: 'N',
      hideChildInMenu: 'N',
      resourceType: 'm',
      activity: 'Y'
    },
    data
  )

  nextTick(() => {
    form.value?.doCreate('insert', record.value)
  })
}

const doDel = async(records: object[]) => {
  return resourceApi.deleteResourceInfo(requestBuilder('delete', records)).then(res => {
    if (res.code !== '0000') {
      Notification.error({
        message: '系统消息',
        description: res.message || '删除失败!'
      })
      return Promise.reject(res)
    }

    Notification.success({
      message: '系统消息',
      description: '删除成功!'
    })

    emits('deleted')
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
        ? resourceApi.addResourceInfo(requestBuilder(action, record))
        : resourceApi.modifyResourceInfo(requestBuilder(action, record))

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
    record.value = { key: '' }
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
  doAdd,
  doDel
})
</script>

<style lang="less" scoped>
.readonly-container {
  .readonly-item {
    padding-left: 10px;
    &:not(:last-child) {
      margin-bottom: 8px;
    }
    .name {
      display: inline-block;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.85);
      text-align: right;
      margin-right: 8px;
    }
    .value {
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.85);
    }
  }
}
</style>
