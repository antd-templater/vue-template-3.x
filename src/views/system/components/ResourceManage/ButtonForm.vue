<template>
  <section class="resource-button-form-container">
    <SForm
      ref="form"
      v-model="model"
      :disabled="disabled"
      :readonly="readonly"
      :spinning="spinning"
      :groups="groups"
      :rules="rules"
      :grid="grid"
    />
  </section>
</template>

<script setup lang="ts">
import { formGroupsDefiner } from '@antd-templater/library-3.x'
import { formRulesDefiner } from '@antd-templater/library-3.x'
import { formGridDefiner } from '@antd-templater/library-3.x'

export interface Props {
  presetOptions: {
    buttons: Record<string, any>[]
  }
  disabled: boolean;
  readonly: boolean;
  loading: boolean;
}

defineOptions({
  name: 'ResourceButtonForm',
  inheritAttrs: false
})

const form = ref(null as InstanceType<SForm> | null)
const props = withDefaults(defineProps<Props>(), {})
const spinning = computed(() => props.loading)
const model: Ref<any> = ref({ })
const action = ref('')

const groups = formGroupsDefiner([
  {
    type: 'AGroup',
    slot: '',
    field: 'AGroup-1',
    label: '',
    grid: {}
  },
  {
    type: 'AInput',
    slot: 'title',
    field: 'title',
    label: '按钮名称',
    props: {
      placeholder: '请输入按钮名称',
      options: props.presetOptions.buttons
    }
  },
  {
    type: 'AInput',
    slot: 'resourceName',
    field: 'resourceName',
    label: '按钮标识',
    props: {
      placeholder: '请输入按钮标识'
    }
  },
  {
    type: 'AInput',
    slot: 'sort',
    field: 'sort',
    label: '按钮排序',
    props: {
      placeholder: '请输入按钮排序'
    }
  },
  {
    type: 'AGroup',
    slot: 'AGroup-2',
    field: 'AGroup-2',
    border: true,
    grid: {}
  },
  {
    type: 'ASwitch',
    slot: 'activity',
    field: 'activity',
    label: '是否启用',
    props: {
      checkedValue: 'Y',
      unCheckedValue: 'N',
      checkedChildren: '开',
      unCheckedChildren: '关'
    }
  }
])

const rules = formRulesDefiner({
  title: [{ required: true, message: '请输入按钮名称' }],
  resourceName: [{ required: true, message: '请输入按钮标识' }],
  sort: [{ required: true, message: '请输入按钮排序' }]
})

const grid = formGridDefiner({
  gutter: 8,
  xs: 24
})

const resetFields = (...rest: any[]) => {
  return form.value?.resetFields(...rest)
}

const validateFields = (...rest: any[]) => {
  return form.value?.validateFields(...rest).then(() => ({
    action: action.value,
    record: model.value
  }))
}

const doCreate = (type: string, record: object) => {
  action.value = type
  model.value = record
}

const doClose = () => {
  action.value = ''
  model.value = {}
}

defineExpose({
  validateFields,
  resetFields,
  doCreate,
  doClose
})
</script>

<style lang="less" scoped>
:deep(.s-form-container) {
  .ant-form.ant-form-horizontal {
    .ant-form-item .ant-form-item-label {
      width: 80px;
      margin-right: 5px;
    }
  }
}
</style>
