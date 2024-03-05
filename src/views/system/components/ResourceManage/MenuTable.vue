<template>
  <section class="button-table-container">
    <ACard
      title="子菜单资源"
      style="display: flex; flex-flow: column nowrap; height: 100%;"
      :headStyle="cardHeadStyle"
      :bodyStyle="cardBodyStyle"
      :bordered="false"
    >
      <template #extra>
        <AButton
          v-if="parentNode.value"
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
        style="width: 100%; height: 100%; overflow: auto;"
        :columnPresetResizable="true"
        :loadData="loadData"
        :immediate="false"
        :border="false"
        :scroll="scroll"
        :sticky="sticky"
        :bodyMinRows="15"
        tableLayout="auto"
        rowKey="resourceId"
      >
        <template #bodyerCell="{ column, record, value, groupIndex }">
          <template v-if="column.key === 'serial'">
            <span>{{ groupIndex + 1 }}</span>
          </template>

          <template v-if="['title', 'resourceName', 'component', 'redirect', 'path', 'sort'].includes(column.key)">
            <SEditCellInput
              v-model:status="cellState"
              :cellStyle="cellStyle"
              :text="String(value)"
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
              @change="doActivitier(record, 'activity', $event)"
            />
          </template>

          <template v-if="column.key === 'icon'">
            <SEditCellSelectIcon
              v-model:status="cellState"
              :cellStyle="cellStyle"
              :text="String(value)"
              empty="无"
              @change="doTableChange(record, column.key, $event.value)"
              @confirm="doTableModify(record)"
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

import { CSSProperties, createVNode, render } from 'vue'
import { requestBuilder } from '@/utils/common'
import * as resourceApi from '@/api/resource'

import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
import ConfirmDialog from 'ant-design-vue/es/modal/ConfirmDialog'
import Notification from 'ant-design-vue/es/notification'
import MenuDrawer from './MenuDrawer.vue'

export interface Props {
  parentNode: Record<string, any>;
  parentInfo: Record<string, any>;
}

defineOptions({
  name: 'ButtonTable',
  inheritAttrs: false
})

const props = defineProps<Props>()
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
  showTotal: true,
  visible: true,
  fixed: true
})

const loadData = tableLoadDataDefiner(async options => {
  const param = requestBuilder('', queryParams.value, options.paginate, options.sorter)

  return resourceApi.getResourceInfoList(param).then(res => {
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

const doDrawerDel = (record: object) => {
  // fix Modal.confirm not closed bug in vue3.4
  const element = document.createDocumentFragment() as any
  const dialog = createVNode(ConfirmDialog, {
    type: 'confirm',
    visible: true,
    prefixCls: 'ant-modal',
    rootPrefixCls: 'ant',
    contentPrefixCls: 'ant-modal-confirm',
    icon: createVNode(ExclamationCircleOutlined),
    title: '是否确认删除该菜单?',
    content: '删除菜单会导致相关页面丢失，请慎重考虑!',
    cancelText: '取消',
    okText: '删除',
    okType: 'danger',
    onCancel: () => {
      dialog.component!.props.visible = false
    },
    onOk: () => {
      menuDrawer.value?.doDel([record]).finally(() => {
        dialog.component!.props.visible = false
      })
    }
  })

  // Render Modal.confirm
  render(dialog, element)
}

const doDrawerAdd = () => {
  menuDrawer.value?.doAdd({
    parentId: props.parentNode.value
  })
}

defineExpose({
  queryParams,
  doTableRefresh,
  doTableReady,
  doTableClear
})
</script>

<style lang="less" scoped>
.button-table-container {
  width: 100%;
  height: 100%;
}
</style>
