<template>
  <section class="section-container">
    <ACard
      :style="cardStyle"
      :headStyle="cardHeadStyle"
      :bodyStyle="cardBodyStyle"
      :bordered="false"
    >
      <div class="section-query-container">
        <RoleQuery
          ref="query"
          @queryTable="doTableRefresh"
          @addRecord="doDrawerAdd"
        />
      </div>

      <div class="section-table-container">
        <RoleTable
          ref="table"
          @editRecord="doDrawerEidt"
        />
      </div>
    </ACard>

    <RoleDrawer
      ref="drawer"
      @submitted="doTableRefresh"
    />
  </section>
</template>

<script setup lang="ts">
import { CSSProperties } from 'vue'
import RoleQuery from './components/RoleManage/RoleQuery.vue'
import RoleTable from './components/RoleManage/RoleTable.vue'
import RoleDrawer from './components/RoleManage/RoleDrawer.vue'

defineOptions({
  name: 'RoleManage',
  inheritAttrs: false
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

const table = ref(null as InstanceType<typeof RoleTable> | null)
const query = ref(null as InstanceType<typeof RoleQuery> | null)
const drawer = ref(null as InstanceType<typeof RoleDrawer> | null)

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
