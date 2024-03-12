<template>
  <section class="resource-menu-table-container">
    <ACard
      title="子菜单资源"
      style="display: flex; flex-flow: column nowrap; height: 100%;"
      :headStyle="cardHeadStyle"
      :bodyStyle="cardBodyStyle"
      :bordered="false"
    >
      <STable
        ref="table"
        v-model:loading="loading"
        v-model:columns="columns"
        v-model:paginate="paginate"
        style="width: 100%; height: 100%; overflow: auto;"
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

          <template v-if="['title', 'resourceName', 'component', 'sort'].includes(column.key)">
            <SEditCellInput
              v-model:status="cellState"
              :cellStyle="cellStyle"
              :text="String(value ?? '')"
              empty="无"
              @change="doTableChange(record, column.key, $event.value)"
              @confirm="doTableModify(record)"
            />
          </template>

          <template v-if="['redirect', 'path'].includes(column.key)">
            <SEditCellTextarea
              v-model:status="cellState"
              :cellStyle="cellStyle"
              :text="String(value ?? '')"
              empty="无"
              @change="doTableChange(record, column.key, $event.value)"
              @confirm="doTableModify(record)"
            />
          </template>

          <template v-if="['hideChildInMenu', 'hideInMenu', 'allowCache', 'activity'].includes(column.key)">
            <ASwitch
              :checked="value"
              checkedValue="Y"
              unCheckedValue="N"
              checkedChildren="是"
              unCheckedChildren="否"
              @change="doActivitier(record, column.key, $event)"
            />
          </template>

          <template v-if="column.key === 'icon'">
            <SEditCellSelectIcon
              v-model:status="cellState"
              :cellStyle="cellStyle"
              :text="String(value ?? '')"
              allowClear
              empty="无"
              @change="doTableChange(record, column.key, $event.value)"
              @confirm="doTableModify(record)"
            />
          </template>
        </template>
      </STable>
    </ACard>

    <MenuDrawer
      ref="menuDrawer"
      @submitted="doTableRefresh"
      @deleted="doTableRefresh"
    />
  </section>
</template>

<script setup lang="ts">
import { tableLoadDataDefiner } from '@antd-templater/antd-template-lib3.x'
import { tablePaginateDefiner } from '@antd-templater/antd-template-lib3.x'
import { tableColumnsDefiner } from '@antd-templater/antd-template-lib3.x'
import { tableStickyDefiner } from '@antd-templater/antd-template-lib3.x'
import { tableScrollDefiner } from '@antd-templater/antd-template-lib3.x'

import { CSSProperties } from 'vue'
import { requestBuilder } from '@/utils/common'
import * as resourceApi from '@/api/resource'

import Notification from 'ant-design-vue/es/notification'
import MenuDrawer from './MenuDrawer.vue'

defineOptions({
  name: 'ResourceMenuTable',
  inheritAttrs: false
})

const table = ref(null as InstanceType<STable> | null)
const menuDrawer = ref(null as InstanceType<typeof MenuDrawer> | null)

const queryParams = ref({
  resourceType: 'm',
  parentId: ''
})

const cardHeadStyle: CSSProperties = {
  flex: '0 0 auto',
  overflow: 'hidden'
}

const cardBodyStyle: CSSProperties = {
  flex: '1 1 auto',
  overflow: 'auto',
  position: 'relative',
  boxSizing: 'border-box',
  padding: '20px'
}

const loading = ref(false)
const cellState = ref(false)
const cellStyle = {
  container: {
    display: 'inline-block',
    width: 'auto'
  },
  inputWrapper: {
    display: 'inline-block',
    minWidth: '180px',
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
    title: '菜单名称',
    dataIndex: 'title',
    minWidth: 100,
    fixed: 'left'
  },
  {
    title: '菜单标识',
    dataIndex: 'resourceName',
    minWidth: 150
  },
  {
    title: '组件标识',
    dataIndex: 'component',
    minWidth: 150
  },
  {
    title: '跳转路径',
    dataIndex: 'redirect',
    minWidth: 150
  },
  {
    title: '访问路径',
    dataIndex: 'path',
    minWidth: 150
  },
  {
    title: '菜单图标',
    dataIndex: 'icon',
    minWidth: 150
  },
  {
    title: '菜单排序',
    dataIndex: 'sort',
    minWidth: 150
  },
  {
    title: '隐藏子菜单',
    dataIndex: 'hideChildInMenu',
    width: 120
  },
  {
    title: '隐藏菜单',
    dataIndex: 'hideInMenu',
    width: 120
  },
  {
    title: '是否缓存',
    dataIndex: 'allowCache',
    width: 120
  },
  {
    title: '是否启用',
    dataIndex: 'activity',
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

const loadData = tableLoadDataDefiner(async options => {
  const params = requestBuilder('', queryParams.value, options.paginate, options.sorter)

  return resourceApi.getResourceListInfo(params).then(res => {
    if (res.code !== '0000') {
      Notification.error({
        message: '系统消息',
        description: res.message || '按钮资源查询失败!'
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
  record[key] = key === 'sort' ? +value || '' : value
  table.value?.update()
}

const doTableModify = (record: object) => {
  return resourceApi.modifyResourceInfo(requestBuilder('update', record)).then(res => {
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

defineExpose({
  queryParams,
  doTableRefresh,
  doTableReady,
  doTableClear
})
</script>

<style lang="less" scoped>
.resource-menu-table-container {
  width: 100%;
  height: 100%;
}
</style>
