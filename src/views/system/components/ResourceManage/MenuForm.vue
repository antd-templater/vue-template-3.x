<template>
  <section class="resource-menu-form-container">
    <SForm
      ref="form"
      v-model="model"
      :disabled="disabled"
      :readonly="readonly"
      :spinning="spinning"
      :groups="groups"
      :rules="rules"
      :grid="grid"
    >
      <template #s-component-icon-select="{ source, field, attrs }">
        <SIconSelect
          v-model:value="source[field]"
          v-bind="attrs"
        />
      </template>
    </SForm>
  </section>
</template>

<script setup lang="ts">
export interface Props {
  disabled: boolean;
  readonly: boolean;
  loading: boolean;
}

defineOptions({
  name: 'ResourceMenuForm',
  inheritAttrs: false,
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
    label: '',
    grid: {},
  },
  {
    type: 'AInput',
    slot: 'title',
    field: 'title',
    label: '菜单名称',
    props: {
      placeholder: '请输入菜单名称',
    },
  },
  {
    type: 'AInput',
    slot: 'resourceName',
    field: 'resourceName',
    label: '菜单标识',
    props: {
      placeholder: '请输入菜单标识',
    },
  },
  {
    type: 'AAutoComplete',
    slot: 'component',
    field: 'component',
    label: '组件标识',
    props: {
      showSearch: true,
      placeholder: '请输入组件名称',
      replaceFields: { label: 'label', value: 'label' },
      filterOption: (value: string, option: { label: string; }) => {
        return !value.trim() || option.label.startsWith(value.trim())
      },
      options: [
        {
          label: 'PageView',
          value: 'PageView',
        },
        {
          label: 'RouteView',
          value: 'RouteView',
        },
        {
          label: 'PageFrame',
          value: 'PageFrame',
        },
      ],
    },
  },
  {
    type: 'AInput',
    slot: 'redirect',
    field: 'redirect',
    label: '跳转路径',
    props: {
      placeholder: '请输入跳转路径',
    },
  },
  {
    type: 'AInput',
    slot: 'path',
    field: 'path',
    label: '访问路径',
    props: {
      placeholder: '请输入访问路径',
    },
  },
  {
    type: 'ASelect',
    slot: 'icon-select',
    field: 'icon',
    label: '菜单图标',
    props: {
      placeholder: '请输入菜单图标',
      allowClear: true,
      multiple: false,
      mode: 'tags',
    },
    transfer: {
      output: (value, { helper }) => helper.isArray(value) ? value.slice(-1)[0] : value,
    },
  },
  {
    type: 'AInput',
    slot: 'sort',
    field: 'sort',
    label: '菜单排序',
    props: {
      placeholder: '请输入菜单排序',
    },
  },
  {
    type: 'AGroup',
    slot: 'AGroup-2',
    field: 'AGroup-2',
    border: true,
    grid: {},
  },
  {
    type: 'ASwitch',
    slot: 'hideChildInMenu',
    field: 'hideChildInMenu',
    label: '隐藏子菜单',
    props: {
      checkedValue: 'Y',
      unCheckedValue: 'N',
      checkedChildren: '开',
      unCheckedChildren: '关',
    },
  },
  {
    type: 'ASwitch',
    slot: 'hideInMenu',
    field: 'hideInMenu',
    label: '隐藏菜单',
    props: {
      checkedValue: 'Y',
      unCheckedValue: 'N',
      checkedChildren: '开',
      unCheckedChildren: '关',
    },
  },
  {
    type: 'ASwitch',
    slot: 'allowCache',
    field: 'allowCache',
    label: '是否缓存',
    props: {
      checkedValue: 'Y',
      unCheckedValue: 'N',
      checkedChildren: '开',
      unCheckedChildren: '关',
    },
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
      unCheckedChildren: '关',
    },
  },
])

const rules = formRulesDefiner({
  title: [{ required: true, message: '请输入菜单名称' }],
  resourceName: [{ required: true, message: '请输入菜单标识' }],
  component: [{ required: true, message: '请输入组件名称' }],
  sort: [{ required: true, message: '请输入菜单排序' }],
})

const grid = formGridDefiner({
  gutter: 8,
  xs: 24,
})

const resetFields = (...rest: any[]) => {
  return form.value?.resetFields(...rest)
}

const validateFields = (...rest: any[]) => {
  return form.value?.validateFields(...rest).then(() => ({
    action: action.value,
    record: model.value,
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
  doClose,
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
