<template>
  <section class="organize-form-container">
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
import { formGroupsDefiner } from '@antd-templater/antd-template-lib3.x'
import { formRulesDefiner } from '@antd-templater/antd-template-lib3.x'
import { formGridDefiner } from '@antd-templater/antd-template-lib3.x'

export interface Props {
  dictionary: {
    orgTree: any[];
    isOrg: any[];
  },
  disabled: boolean;
  readonly: boolean;
  loading: boolean;
}

defineOptions({
  name: 'OrganizeForm',
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
    slot: 'title',
    field: 'title',
    label: '名称',
    props: {
      rows: 1,
      autoSize: true,
      placeholder: '请输入名称'
    }
  },
  {
    type: 'AInput',
    slot: 'orgShortName',
    field: 'orgShortName',
    label: '简称',
    props: {
      placeholder: '请输入简称'
    }
  },
  {
    type: 'ASelect',
    slot: 'isOrg',
    field: 'isOrg',
    label: '形态',
    props: {
      placeholder: '请选择组织形态',
      options: props.dictionary.isOrg
    }
  },
  {
    type: 'ATreeSelect',
    slot: 'parentOrgId',
    field: 'parentOrgId',
    label: '上级',
    props: {
      dropdownClassName: 'text-ellipsis',
      dropdownStyle: {
        maxHeight: '300px'
      },
      allowClear: true,
      showSearch: true,
      treeDefaultExpandAll: true,
      dropdownMatchSelectWidth: true,
      treeNodeFilterProp: 'label',
      placeholder: '请选择上级',
      treeData: props.dictionary.orgTree
    },
    transfer: {
      input: value => value !== '0' ? value : '',
      output: value => value || '0'
    }
  },
  {
    type: 'AGroup',
    slot: 'AGroup-2',
    field: 'AGroup-2',
    label: '',
    border: true,
    grid: {}
  },
  {
    type: 'ASwitch',
    slot: 'activity',
    field: 'activity',
    label: '状态',
    props: {
      checkedValue: 'Y',
      unCheckedValue: 'N',
      checkedChildren: '开',
      unCheckedChildren: '关'
    }
  }
])

const rules = formRulesDefiner({
  title: [{ required: true, message: '请输入名称' }],
  isOrg: [{ required: true, message: '请选择形态' }],
  orgShortName: [{ required: true, message: '请输入简称' }]
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
    .ant-form-item > .ant-form-item-label {
      width: 54px;
      margin-right: 5px;
    }
  }
}
</style>
