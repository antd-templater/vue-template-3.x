<template>
  <section class="user-table-container">
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
      rowKey="id"
    >
      <template #bodyerCell="{ column, record, value, groupIndex }">
        <template v-if="column.key === 'serial'">
          <span>{{ groupIndex + 1 }}</span>
        </template>

        <template v-if="column.key === 'orgId'">
          {{ takeTextByKey(props.presetOptions.orgTree, value, ['shortName', 'label']) }}
        </template>

        <template v-if="column.key === 'deptId'">
          {{ takeTextByKey(props.presetOptions.deptId, value) }}
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
            style="font-weight: 500; display: inline-block;  margin: 0 7px;"
            @click="doTableEdit(record)"
          >
            修改
          </a>
        </template>
      </template>
    </STable>
  </section>
</template>

<script setup lang="ts">
import { tableLoadDataDefiner } from '@antd-templater/library-3.x'
import { tablePaginateDefiner } from '@antd-templater/library-3.x'
import { tableColumnsDefiner } from '@antd-templater/library-3.x'
import { tableStickyDefiner } from '@antd-templater/library-3.x'
import { tableScrollDefiner } from '@antd-templater/library-3.x'

import Notification from 'ant-design-vue/es/notification'
import { requestBuilder, takeTextByKey } from '@/utils/common'
import * as userApi from '@/api/user'

export interface Props {
  presetOptions: {
    orgTree: any[];
    deptId: any[];
    roleId: any[];
  }
}

export interface Emits {
  (e: 'editRecord', data: any): void;
}

defineOptions({
  name: 'UserTable',
  inheritAttrs: false
})

const queryParams = ref({
  userNo: '',
  activity: ''
})

const props = defineProps<Props>()
const emits = defineEmits<Emits>()
const table = ref(null as InstanceType<STable> | null)

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
    title: '用户名',
    dataIndex: 'userNo',
    ellipsis: true,
    width: 130
  },
  {
    title: '用户姓名',
    dataIndex: 'userName',
    ellipsis: true,
    width: 130
  },
  {
    title: '手机号',
    dataIndex: 'mobilePhone',
    ellipsis: true,
    width: 120
  },
  {
    title: '职位',
    dataIndex: 'postName'
  },
  {
    title: '所属组织',
    dataIndex: 'orgId'
  },
  {
    title: '所属部门',
    dataIndex: 'deptId'
  },
  {
    title: '可用状态',
    dataIndex: 'activity',
    align: 'center',
    width: 80
  },
  {
    title: '操作',
    dataIndex: 'action',
    align: 'center',
    width: 80
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
  const params = requestBuilder(
    '',
    queryParams.value,
    options.paginate,
    options.sorter
  )

  return userApi.getUserInfoList(params).then(res => {
    if (res.code !== '0000') {
      Notification.error({
        message: '系统消息',
        description: res.message || '用户查询查询失败!'
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

const doTableModify = (record: object) => {
  return userApi.modifyUserInfo(requestBuilder('update', record)).then(res => {
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
  table.value?.refresh()
}

defineExpose({
  doTableRefresh,
  queryParams
})
</script>

<style lang="less" scoped>
.user-table-container {
  width: 100%;
  height: 100%;
  overflow: auto;
}
</style>
