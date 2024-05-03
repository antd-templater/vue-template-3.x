<template>
  <section class="user-drawer-form-container">
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
export interface Props {
  presetOptions: {
    orgTree: any[];
    deptId: any[];
    roleId: any[];
  }
  disabled: boolean;
  readonly: boolean;
  loading: boolean;
}

defineOptions({
  name: 'UserForm',
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
    slot: 'userNo',
    field: 'userNo',
    label: '用户名',
    props: {
      rows: 1,
      autoSize: true,
      placeholder: '请输入用户名'
    }
  },
  {
    type: 'AInputPassword',
    slot: 'password',
    field: 'password',
    label: '用户密码',
    props: {
      placeholder: '请输入用户密码'
    }
  },
  {
    type: 'AInput',
    slot: 'userName',
    field: 'userName',
    label: '用户姓名',
    props: {
      placeholder: '请输入用户姓名'
    }
  },
  {
    type: 'AInput',
    slot: 'mobilePhone',
    field: 'mobilePhone',
    label: '手机号码',
    props: {
      placeholder: '请输入手机号码'
    }
  },
  {
    type: 'AInput',
    slot: 'idCard',
    field: 'idCard',
    label: '身份证号',
    props: {
      placeholder: '请输入身份证号'
    }
  },
  {
    type: 'ATreeSelect',
    slot: 'orgId',
    field: 'orgId',
    label: '所属组织',
    props: {
      popupClassName: 'text-ellipsis',
      dropdownStyle: {
        maxHeight: '300px'
      },
      allowClear: true,
      showSearch: true,
      treeDefaultExpandAll: true,
      dropdownMatchSelectWidth: true,
      treeNodeFilterProp: 'label',
      placeholder: '请选择所属组织',
      treeData: props.presetOptions.orgTree
    }
  },
  {
    type: 'ASelect',
    slot: 'deptId',
    field: 'deptId',
    label: '所属部门',
    props: {
      allowClear: true,
      placeholder: '请选择所属部门',
      options: props.presetOptions.deptId
    }
  },
  {
    type: 'ASelect',
    slot: 'roleId',
    field: 'roleId',
    label: '所属角色',
    props: {
      mode: 'multiple',
      placeholder: '请选择所属角色',
      allowClear: true,
      fieldNames: { label: 'roleName', value: 'roleId' },
      options: props.presetOptions.roleId
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
    label: '用户状态',
    props: {
      checkedValue: 'Y',
      unCheckedValue: 'N',
      checkedChildren: '开',
      unCheckedChildren: '关'
    }
  }
])

const rules = formRulesDefiner({
  userNo: [{ required: true, message: '请输入用户名' }],
  password: formValidator.password({
    message: '请输入用户密码',
    validator: '用户密码过短',
    pattern: /.{6,}/,
    required: true
  }),
  userName: [{ required: true, message: '请输入用户姓名' }],
  mobilePhone: [{ required: true, message: '请输入手机号码' }],
  idCard: [{ required: true, message: '请输入身份证号' }],
  orgId: [{ required: true, message: '请选择所属组织' }],
  roleId: [{ required: true, message: '请选择所属角色' }]
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
