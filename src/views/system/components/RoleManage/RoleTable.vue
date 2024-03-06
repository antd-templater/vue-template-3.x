<template>
  <section class="organize-table-container">
    <STable
      ref="table"
      v-model:columns="columns"
      v-model:paginate="paginate"
      :columnPresetResizable="true"
      :loadData="loadData"
      :bodyMinRows="true"
      :immediate="true"
      :border="false"
      :scroll="scroll"
      :sticky="sticky"
      rowKey="key"
    >
      <template #bodyerCell="{ column, record, value, groupIndex }">
        <template v-if="column.key === 'serial'">
          <span>{{ groupIndex + 1 }}</span>
        </template>

        <template v-if="column.key === 'roleName'">
          <SEditCellInput
            v-model:status="cellState"
            :cellStyle="cellStyle"
            :text="value"
            @change="doTableChange(record, column.key, $event.value)"
            @confirm="doTableModify(record)"
          />
        </template>

        <template v-if="column.key === 'dataFlag'">
          <SEditCellSelect
            v-model:status="cellState"
            :cellStyle="cellStyle"
            :text="value"
            :options="presetOptions.dataFlag"
            @change="doTableChange(record, column.key, $event.value)"
            @confirm="doTableModify(record)"
          />
        </template>

        <template v-if="column.key === 'activity'">
          <ASwitch
            :checked="value"
            checkedValue="Y"
            unCheckedValue="N"
            checkedChildren="开"
            unCheckedChildren="关"
            @change="doActivitier(record, 'activity', $event)"
          />
        </template>

        <template v-if="column.key === 'action'">
          <a
            href="javascript: void(0)"
            style="display: inline-block; margin: 0 7px; font-weight: 500;"
            @click.stop="doResourceOpen(record)"
          >
            资源配置
          </a>

          <a
            href="javascript: void(0)"
            style="display: inline-block; margin: 0 7px; font-weight: 500;"
            @click="doTableEdit(record)"
          >
            修改
          </a>
        </template>
      </template>
    </STable>

    <RoleResource
      ref="roleResource"
      @submitted="() => {}"
    />
  </section>
</template>

<script setup lang="ts">
import { tableLoadDataDefiner } from '@antd-templater/antd-template-lib3.x'
import { tablePaginateDefiner } from '@antd-templater/antd-template-lib3.x'
import { tableColumnsDefiner } from '@antd-templater/antd-template-lib3.x'
import { tableStickyDefiner } from '@antd-templater/antd-template-lib3.x'
import { tableScrollDefiner } from '@antd-templater/antd-template-lib3.x'

import Notification from 'ant-design-vue/es/notification'
import { requestBuilder } from '@/utils/common'
import RoleResource from './RoleResource.vue'
import * as roleApi from '@/api/role'

export interface Emits {
  (e: 'editRecord', data: any): void;
}

defineOptions({
  name: 'RoleTable',
  inheritAttrs: false
})

const queryParams = ref({
  roleName: '',
  activity: ''
})

const presetOptions = ref({
  dataFlag: [
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

})

const emits = defineEmits<Emits>()
const table = ref(null as InstanceType<STable> | null)
const roleResource = ref(null as InstanceType<typeof RoleResource> | null)
const cellState = ref(false)
const cellStyle = {
  container: {
    display: 'inline-block',
    width: 'auto'
  },
  inputWrapper: {
    display: 'inline-block',
    maxWidth: '200px',
    paddingRight: '36px'
  },
  textWrapper: {
    display: 'inline-block',
    width: 'auto',
    paddingRight: '36px'
  }
}

const sticky = tableStickyDefiner({
  topHeader: 0,
  leftFooter: false,
  rightFooter: false,
  bottomFooter: false,
  bottomScrollbar: true
})

const scroll = tableScrollDefiner({
  scrollToFirstXOnChange: true,
  scrollToFirstYOnChange: true,
  overflow: 'visible',
  x: 'max-content'
})

const columns = tableColumnsDefiner([
  {
    title: '序号',
    dataIndex: 'serial',
    align: 'center',
    maxWidth: 60,
    width: 60
  },
  {
    title: '角色名称',
    dataIndex: 'roleName'
  },
  {
    title: '数据范围',
    dataIndex: 'dataFlag'
  },
  {
    title: '角色状态',
    dataIndex: 'activity'
  },
  {
    title: '操作',
    dataIndex: 'action',
    align: 'center',
    width: 120
  }
])

const paginate = tablePaginateDefiner({
  pageNo: 1,
  pageSize: 20,
  totalPage: 0,
  totalSize: 0,
  showSizeChanger: true,
  showTotal: true,
  visible: true,
  fixed: true
})

const loadData = tableLoadDataDefiner(options => {
  const param = requestBuilder(
    '',
    queryParams.value,
    options.paginate,
    options.sorter
  )

  return roleApi.getRoleInfoByPages(param).then(res => {
    if (res.code !== '0000') {
      Notification.error({
        message: '系统消息',
        description: res.message || '用户角色查询失败!'
      })
      return Promise.reject(res)
    }

    return res
  })
})

const doActivitier = (record: any, key: string, value: any) => {
  doTableChange(record, key, value)
  doTableModify(record)
}

const doTableChange = (record: any, key: string, value: any) => {
  record[key] = value
  table.value?.update()
}

const doResourceOpen = (record: object) => {
  roleResource.value?.doOpen(record)
}

const doTableModify = (record: object) => {
  return roleApi.modifyRoleInfo(requestBuilder('update', record)).then(res => {
    if (res.code !== '0000') {
      Notification.error({
        message: '系统消息',
        description: '修改失败'
      })
      return Promise.reject(res)
    }

    Notification.success({
      message: '系统消息',
      description: '修改成功'
    })

    doTableRefresh()
  })
}

const doTableEdit = (record: object) => {
  emits('editRecord', record)
}

const doTableRefresh = () => {
  cellState.value = false
  table.value?.refresh()
}

defineExpose({
  doTableRefresh,
  queryParams
})
</script>

<style lang="less" scoped>
.organize-table-container {
  width: 100%;
  height: 100%;
  overflow: auto;
}
</style>
