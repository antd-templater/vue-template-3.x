<template>
  <section class="resource-button-table-container">
    <ACard
      title="按钮资源"
      style="display: flex; flex-flow: column nowrap; height: 100%"
      :headStyle="cardHeadStyle"
      :bodyStyle="cardBodyStyle"
      :bordered="false"
    >
      <template #extra>
        <AButton
          v-if="parentNode.resourceId"
          type="primary"
          @click="doDrawerAdd"
        >
          <template #icon>
            <PlusOutlined />
          </template>
        </AButton>
      </template>

      <STable
        ref="table"
        v-model:loading="loading"
        v-model:columns="columns"
        v-model:paginate="paginate"
        style="height: 100%; overflow: auto"
        :columnPresetResizable="true"
        :loadData="loadData"
        :bodyMinRows="true"
        :immediate="false"
        :border="false"
        :scroll="scroll"
        :sticky="sticky"
        rowKey="resourceId"
      >
        <template #bodyerCell="{ column, record, value, groupIndex }">
          <template v-if="column.key === 'serial'">
            <span>{{ groupIndex + 1 }}</span>
          </template>

          <template v-if="column.key === 'title' || column.key === 'resourceName'">
            <SEditCellInput
              v-model:status="cellState"
              :cellStyle="cellStyle"
              :text="value"
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
              style="display: inline-block; font-weight: 500; margin: 0 7px; color: #f44848;"
              @click.stop="doDrawerDel(record)"
            >
              删除
            </a>
          </template>
        </template>
      </STable>
    </ACard>

    <ButtonDrawer
      ref="buttonDrawer"
      :presetOptions="presetOptions"
      @submitted="doTableRefresh"
      @deleted="doTableRefresh"
    />
  </section>
</template>

<script setup lang="ts">
import { CSSProperties } from 'vue'
import { requestBuilder } from '@/utils/common'
import * as resourceApi from '@/api/resource'

import Notification from 'ant-design-vue/es/notification'
import ButtonDrawer from './ButtonDrawer.vue'
import AModal from 'ant-design-vue/es/modal'

export interface Props {
  parentNode: Record<string, any>;
}

defineOptions({
  name: 'ResourceButtonTable',
  inheritAttrs: false,
})

const props = defineProps<Props>()
const table = ref(null as InstanceType<STable> | null)
const buttonDrawer = ref(null as InstanceType<typeof ButtonDrawer> | null)

const queryParams = ref({
  resourceType: 'b',
  parentId: '',
})

const presetOptions = ref({
  buttons: [
    {
      label: '新增',
      value: 'add',
      sort: 1,
    },
    {
      label: '删除',
      value: 'del',
      sort: 2,
    },
    {
      label: '修改',
      value: 'edit',
      sort: 3,
    },
    {
      label: '查询',
      value: 'query',
      sort: 4,
    },
    {
      label: '重置',
      value: 'reset',
      sort: 5,
    },
    {
      label: '上传',
      value: 'upload',
      sort: 6,
    },
    {
      label: '上报',
      value: 'up',
      sort: 7,
    },
    {
      label: '审批',
      value: 'approve',
      sort: 8,
    },
    {
      label: '导出',
      value: 'export',
      sort: 9,
    },
  ],
})

const cardHeadStyle: CSSProperties = {
  flex: '0 0 auto',
  overflow: 'hidden',
}

const cardBodyStyle: CSSProperties = {
  flex: '1 1 auto',
  overflow: 'auto',
  position: 'relative',
  boxSizing: 'border-box',
  padding: '20px',
}

const loading = ref(false)
const cellState = ref(false)
const cellStyle = {
  container: {
    display: 'inline-block',
    width: 'auto',
  },
  inputWrapper: {
    display: 'inline-block',
    maxWidth: '140px',
    paddingRight: '36px',
  },
  textWrapper: {
    display: 'inline-block',
    width: 'auto',
    paddingRight: '36px',
  },
}

const sticky = tableStickyDefiner({
  topHeader: 0,
  leftFooter: false,
  rightFooter: false,
  bottomFooter: false,
  bottomScrollbar: true,
})

const scroll = tableScrollDefiner({
  scrollToFirstXOnChange: true,
  scrollToFirstYOnChange: true,
  overflow: 'visible',
  x: 'max-content',
})

const columns = tableColumnsDefiner([
  {
    title: '序号',
    dataIndex: 'serial',
    align: 'center',
    maxWidth: 60,
    width: 60,
  },
  {
    title: '按钮名称',
    dataIndex: 'title',
  },
  {
    title: '按钮标识',
    dataIndex: 'resourceName',
  },
  {
    title: '是否启用',
    dataIndex: 'activity',
  },
  {
    title: '操作',
    dataIndex: 'action',
    align: 'center',
    width: 80,
  },
])

const paginate = tablePaginateDefiner({
  pageNo: 1,
  pageSize: 20,
  totalPage: 0,
  totalSize: 0,
  showSizeChanger: true,
  showTotal: true,
  visible: true,
  fixed: true,
})

const loadData = tableLoadDataDefiner(async options => {
  const params = requestBuilder('', queryParams.value, options.paginate, options.sorter)

  return resourceApi.getResourceListInfo(params).then(res => {
    if (res.code !== '0000') {
      Notification.error({
        message: '系统消息',
        description: res.message || '按钮资源查询失败!',
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
  return resourceApi.modifyResourceInfo(requestBuilder('update', record)).then(res => {
    if (res.code !== '0000') {
      Notification.error({
        message: '系统消息',
        description: '修改失败',
      })
      return Promise.reject(res)
    }

    Notification.success({
      message: '系统消息',
      description: '修改成功',
    })

    doTableRefresh()
  })
}

const doTableReady = () => {
  loading.value = true
}

const doTableRefresh = () => {
  cellState.value = false
  loading.value = false
  table.value?.refresh()
}

const doTableClear = () => {
  cellState.value = false
  loading.value = false
  table.value?.clear()
}

const doDrawerDel = (record: object) => {
  AModal.confirm({
    title: '是否确认删除该按钮资源?',
    content: '删除按钮资源会导致相关权限丢失，请慎重考虑!',
    cancelText: '取消',
    okText: '删除',
    okType: 'danger',
    onOk: () => { buttonDrawer.value?.doDel([record]) },
  })
}

const doDrawerAdd = () => {
  buttonDrawer.value?.doAdd({
    parentId: props.parentNode.resourceId,
    component: props.parentNode.component,
  })
}

defineExpose({
  queryParams,
  doTableRefresh,
  doTableReady,
  doTableClear,
})
</script>

<style lang="less" scoped>
.resource-button-table-container {
  width: 100%;
  height: 100%;
}
</style>
