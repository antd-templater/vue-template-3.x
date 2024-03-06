<template>
  <section class="organize-drawer-container">
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
      <div class="readonly-container">
        <div class="readonly-item">
          <span class="name">编码:</span>
          <span class="value">{{ record.key || '由系统生成' }}</span>
        </div>
      </div>

      <ADivider
        :dashed="true"
        style="margin: 16px  0 20px"
      />

      <OrganizeForm
        ref="form"
        :dictionary="props.dictionary"
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
import * as organizeApi from '@/api/organize'

import OrganizeForm from './OrganizeForm.vue'

export interface Props {
  dictionary: {
    orgTree: any[];
    isOrg: any[];
  }
}

export interface Emits{
  (e: 'submitted'): void;
  (e: 'closed'): void;
}

defineOptions({
  name: 'OrganizeDrawer',
  inheritAttrs: false
})

const emits = defineEmits<Emits>()
const props = defineProps<Props>()
const form = ref(null as InstanceType<typeof OrganizeForm> | null)

const title = ref('')
const action = ref('')
const record = ref({ key: '' } as Record<string, any>)
const visible = ref(false)
const readonly = ref(false)
const disabled = ref(false)
const loading = ref(false)
const isAdd = ref(false)

const doEdit = (data: any) => {
  title.value = '修改'
  action.value = 'update'
  readonly.value = false
  visible.value = true
  isAdd.value = false

  record.value = Object.assign(
    {
      parentOrgId: '0',
      activity: 'Y',
      isOrg: 'Y'
    },
    data
  )

  nextTick(() => {
    form.value?.doCreate('update', record.value)
  })
}

const doAdd = (data: any) => {
  title.value = '新增'
  action.value = 'insert'
  readonly.value = false
  visible.value = true
  isAdd.value = true

  record.value = Object.assign(
    {
      parentOrgId: '0',
      activity: 'Y',
      isOrg: 'Y'
    },
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
        ? organizeApi.addOrganizeInfo(requestBuilder(action, record))
        : organizeApi.modifyOrganizeInfo(requestBuilder(action, record))

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
    record.value = { key: '' }
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
.readonly-container {
  .readonly-item {
    padding-left: 10px;
    &:not(:last-child) {
      margin-bottom: 8px;
    }
    .name {
      display: inline-block;
      width: 40px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.85);
      text-align: right;
      margin-right: 16px;
    }
    .value {
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.85);
    }
  }
}
</style>
