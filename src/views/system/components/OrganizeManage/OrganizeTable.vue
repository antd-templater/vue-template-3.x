<template>
  <section class="organize-table-container">
    <STable
      ref="table"
      v-model:columns="columns"
      v-model:paginate="paginate"
      :columnPresetResizable="true"
      :loadData="loadData"
      :bodyMinRows="true"
      :immediate="false"
      :border="false"
      :scroll="scroll"
      :sticky="sticky"
      rowKey="key"
    >
      <template #bodyerCell="{ column, record, value, groupIndex }">
        <template v-if="column.key === 'serial'">
          <span>{{ groupIndex + 1 }}</span>
        </template>

        <template v-if="column.key === 'parentOrgName'">
          <span>{{ takeTextByKey(props.dictionary.orgTree, value) }}</span>
        </template>

        <template v-if="column.key === 'isOrg'">
          <span>{{ takeTextByKey(props.dictionary.isOrg, value) }}</span>
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
            style="font-weight: 500; display: inline-block; margin: 0 7px;"
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
import Notification from 'ant-design-vue/es/notification'
import { requestBuilder, takeTextByKey } from '@/utils/common'
import * as organizeApi from '@/api/organize'

export interface Props {
  dictionary: {
    orgTree: any[];
    isOrg: any[];
  };
}

export interface Emits {
  (e: 'editRecord', data: any): void;
}

defineOptions({
  name: 'OrganizeTable',
  inheritAttrs: false,
})

const props = defineProps<Props>()
const emits = defineEmits<Emits>()
const table = ref(null as InstanceType<STable> | null)
const queryParams = ref({ title: '', orgId: '', deptId: '', activity: '' })

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
    title: '名称',
    dataIndex: 'title',
    tooltip: true,
    fixed: 'left',
  },
  {
    title: '简称',
    dataIndex: 'orgShortName',
  },
  {
    title: '编码',
    dataIndex: 'key',
  },
  {
    title: '上级单位',
    dataIndex: 'parentOrgName',
    tooltip: true,
  },
  {
    title: '形态',
    dataIndex: 'isOrg',
    width: 100,
  },
  {
    title: '可用状态',
    dataIndex: 'activity',
    align: 'center',
    width: 90,
  },
  {
    title: '操作',
    dataIndex: 'action',
    align: 'center',
    fixed: 'right',
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

const loadData = tableLoadDataDefiner(options => {
  const params = requestBuilder(
    '',
    queryParams.value,
    options.paginate,
    options.sorter,
  )

  return organizeApi.getOrganizeInfoList(params).then(res => {
    if (res.code !== '0000') {
      Notification.error({
        message: '系统消息',
        description: res.message || '组织机构查询失败!',
      })
      return Promise.reject(res)
    }

    return res
  })
})

const doActivitier = (record: any, key: string, value: any) => {
  record[key] = value

  table.value?.update()

  return organizeApi.modifyOrganizeInfo(requestBuilder('update', record)).then(res => {
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

const doTableRefresh = (force?: boolean) => {
  table.value?.refresh(force)
}

const doTableEdit = (record: any) => {
  emits('editRecord', record)
}

defineExpose({
  doTableRefresh,
  queryParams,
})
</script>

<style lang="less" scoped>
.organize-table-container {
  width: 100%;
  height: 100%;
  overflow: auto;
}
</style>
