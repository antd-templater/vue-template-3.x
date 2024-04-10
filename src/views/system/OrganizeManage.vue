<template>
  <section class="section-container">
    <div
      class="section-left-container"
      :style="{ width: collapse ? '0' : '334px' }"
    >
      <div class="section-left-tree">
        <OrganizeTree
          ref="tree"
          :dictionary="dictionary"
          @addRecord="doDrawerAdd"
          @selectedNode="doSelectedNode"
          @queryTable="doTableRefresh"
          @queryAll="doQueryAll"
        />
      </div>
    </div>

    <div class="section-right-container">
      <ACard
        :style="cardStyle"
        :headStyle="cardHeadStyle"
        :bodyStyle="cardBodyStyle"
        :bordered="false"
      >
        <div class="section-query-container">
          <OrganizeQuery
            ref="query"
            @queryTable="doTableRefresh"
            @addRecord="doDrawerAdd"
          />
        </div>

        <div class="section-table-container">
          <OrganizeTable
            ref="table"
            :dictionary="dictionary"
            @editRecord="doDrawerEidt"
          />
        </div>
      </ACard>

      <AButton
        type="link"
        class="section-tree-collapse"
        @click.stop="collapse = !collapse"
      >
        <template #icon>
          <DoubleRightOutlined v-if="collapse" />
          <DoubleLeftOutlined v-if="!collapse" />
        </template>
      </AButton>
    </div>

    <OrganizeDrawer
      ref="drawer"
      :dictionary="dictionary"
      @submitted="doTableRefresh"
    />
  </section>
</template>

<script setup lang="ts">
import { CSSProperties } from 'vue'
import OrganizeTree from './components/OrganizeManage/OrganizeTree.vue'
import OrganizeQuery from './components/OrganizeManage/OrganizeQuery.vue'
import OrganizeTable from './components/OrganizeManage/OrganizeTable.vue'
import OrganizeDrawer from './components/OrganizeManage/OrganizeDrawer.vue'
import useAppStore from '@/store/app'
import * as baseApi from '@/api/base'

defineOptions({
  name: 'OrganizeManage',
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

const tree = ref(null as InstanceType<typeof OrganizeTree> | null)
const table = ref(null as InstanceType<typeof OrganizeTable> | null)
const query = ref(null as InstanceType<typeof OrganizeQuery> | null)
const drawer = ref(null as InstanceType<typeof OrganizeDrawer> | null)
const selecter = ref(null as Record<string, any> | null)
const collapse = ref(false as boolean)
const appStore = useAppStore()

const dictionary = ref({
  orgTree: [] as any[],
  isOrg: [
    { label: '组织', value: 'Y' },
    { label: '部门', value: 'N' }
  ]
})

const doOptionsQuery = () => {
  baseApi.getTreeById({ id: 'orgTree' }).then(res => {
    if (res.code !== '0000') {
      return Promise.reject(new Error())
    }

    dictionary.value.orgTree.splice(0)
    dictionary.value.orgTree.push(...res.result)
  })
}

const doSelectedNode = (node: any) => {
  selecter.value = node
}

const doTableRefresh = (params = {}) => {
  if (table.value) {
    table.value.queryParams = { ...table.value.queryParams, ...params }
    table.value.doTableRefresh()
  }
}

const doTreeRefresh = () => {
  tree.value?.doRefresh()
}

const doDrawerEidt = (record: any) => {
  drawer.value?.doEdit(record)
}

const doDrawerAdd = () => {
  drawer.value?.doAdd({ parentOrgId: selecter.value?.key })
}

const doQueryAll = () => {
  doOptionsQuery()
  doTreeRefresh()
}

onMounted(() => {
  doQueryAll()
})
</script>

<style lang="less" scoped>
.section-container {
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  height: v-bind('appStore.layoutViewStyle.minHeight');
  padding: 20px 20px;
  box-sizing: border-box;
  position: relative;

  .section-left-container {
    flex: 0 0 auto;
    width: 334px;
    height: 100%;
    overflow: hidden;
    transition: width 0.25s ease;
    position: relative;
    z-index: 30;

    .section-left-tree {
      width: 310px;
      height: 100%;
    }
  }

  .section-right-container {
    display: flex;
    flex-flow: column nowrap;
    flex: 1 1 auto;
    width: calc(100% - 334px);
    height: 100%;
    position: relative;
    z-index: 50;

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

    .section-tree-collapse {
      font-size: 14px; // because default is scale(1.143)
      margin: -30px 0 0 12px;
      border: none;
      transform: translate(-50%, -50%);
      position: absolute;
      top: 50%;
      left: 0;
      cursor: pointer;
    }
  }
}
</style>
