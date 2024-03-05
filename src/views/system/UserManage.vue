<template>
  <section class="section-container">
    <ACard
      :style="cardStyle"
      :headStyle="cardHeadStyle"
      :bodyStyle="cardBodyStyle"
      :bordered="false"
    >
      <div class="section-query-container">
        <UserQuery
          ref="query"
          @queryTable="doTableRefresh"
          @addRecord="doDrawerAdd"
        />
      </div>

      <div class="section-table-container">
        <UserTable
          ref="table"
          :presetOptions="presetOptions"
          @editRecord="doDrawerEidt"
        />
      </div>
    </ACard>

    <UserDrawer
      ref="drawer"
      :presetOptions="presetOptions"
      @submitted="doTableRefresh"
    />
  </section>
</template>

<script setup lang="ts">
import { CSSProperties } from 'vue'
import { requestBuilder } from '@/utils/common'
import UserQuery from './components/UserManage/UserQuery.vue'
import UserTable from './components/UserManage/UserTable.vue'
import UserDrawer from './components/UserManage/UserDrawer.vue'
import * as roleApi from '@/api/role'
import * as baseApi from '@/api/base'

defineOptions({
  name: 'UserManage',
  inheritAttrs: false
})

const presetOptions = ref({
  orgTree: [] as any[],
  deptId: [] as any[],
  roleId: [] as any[]
})

const cardStyle: CSSProperties = {
  display: 'flex',
  flexFlow: 'column nowrap',
  flex: '1 1 auto',
  width: '100%',
  height: '100%',
  overflow: 'hidden'
}

const cardHeadStyle: CSSProperties = {
  flex: '0 0 auto',
  overflow: 'hidden'
}

const cardBodyStyle: CSSProperties = {
  display: 'flex',
  flexFlow: 'column nowrap',
  flex: '1 1 auto',
  padding: '20px 24px 6px',
  overflow: 'hidden',
  position: 'relative'
}

const table = ref(null as InstanceType<typeof UserTable> | null)
const query = ref(null as InstanceType<typeof UserQuery> | null)
const drawer = ref(null as InstanceType<typeof UserDrawer> | null)

const doTableRefresh = (params = {}) => {
  if (table.value) {
    table.value.queryParams = { ...table.value.queryParams, ...params }
    table.value.doTableRefresh()
  }
}

const doDrawerEidt = (record: any) => {
  drawer.value?.doEdit(record)
}

const doDrawerAdd = () => {
  drawer.value?.doAdd({})
}

const doOptionQuery = () => {
  // 组织
  baseApi.getTreeById({ id: 'orgTree' }).then(res => {
    if (res.code !== '0000') {
      return Promise.reject()
    }
    presetOptions.value.orgTree.splice(0)
    presetOptions.value.orgTree.push(...res.result)
  })

  // 部门
  baseApi.getOptionById({ id: 'dept', sqlParams: { orgId: '', isAll: '1' } }).then(res => {
    if (res.code !== '0000') {
      return Promise.reject()
    }
    presetOptions.value.deptId.splice(0)
    presetOptions.value.deptId.push(...res.result)
  })

  // 角色
  roleApi.getRoleInfoList(requestBuilder('', { activity: 'Y' })).then(res => {
    if (res.code !== '0000') {
      return Promise.reject()
    }
    presetOptions.value.roleId.splice(0)
    presetOptions.value.roleId.push(...res.result)
  })
}

doOptionQuery()
</script>

<style lang="less" scoped>
.section-container {
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  height: calc(100vh - 90px);
  padding: 20px 20px;
  box-sizing: border-box;
  position: relative;

  .section-query-container {
    flex: 0 0 auto;
    width: 100%;
    margin-bottom: 20px;
  }

  .section-table-container {
    flex: 1 1 auto;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}
</style>
