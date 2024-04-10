<template>
  <section class="role-form-container">
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
  disabled: boolean;
  readonly: boolean;
  loading: boolean;
}

defineOptions({
  name: 'RoleForm',
  inheritAttrs: false
})

const form = ref(null as InstanceType<SForm> | null)
const props = withDefaults(defineProps<Props>(), {})
const spinning = computed(() => props.loading)
const model: Ref<any> = ref({})
const action = ref('')

const groups = formGroupsDefiner([
  {
    type: 'AGroup',
    slot: '',
    field: 'AGroup-1',
    label: ''
  },
  {
    type: 'AInputTextarea',
    slot: 'roleName',
    field: 'roleName',
    label: '角色名称',
    props: {
      rows: 1,
      autoSize: true,
      placeholder: '请输入角色名称'
    }
  },
  {
    type: 'ASelect',
    slot: 'dataFlag',
    field: 'dataFlag',
    label: '数据范围',
    props: {
      placeholder: '请选择数据范围',
      options: [
        {
          label: '用户级',
          value: '0'
        },
        {
          label: '部门级',
          value: '1'
        },
        {
          label: '公司级',
          value: '2'
        }
      ]
    }
  },
  {
    type: 'AGroup',
    slot: 'AGroup-2',
    field: 'AGroup-2',
    label: '状态信息',
    border: true
  },
  {
    type: 'ASwitch',
    slot: 'activity',
    field: 'activity',
    label: '角色状态',
    props: {
      checkedValue: 'Y',
      unCheckedValue: 'N',
      checkedChildren: '开',
      unCheckedChildren: '关'
    }
  }
])

const rules = formRulesDefiner({
  roleName: [{ required: true, message: '请输入角色名称' }],
  dataFlag: [{ required: true, message: '请选择数据范围' }]
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
