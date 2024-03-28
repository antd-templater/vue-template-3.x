<template>
  <section class="section-container">
    <div
      class="section-left-container"
      :style="{ width: collapse ? '0' : '334px' }"
    >
      <div class="section-left-tree">
        <TreeMenu
          ref="treeMenu"
          @linkage="queryTable"
        />
      </div>
    </div>

    <div class="section-right-container">
      <Component
        :is="['PageView', 'RouteView'].includes(menuNode.component) ? MenuTable : ButtonTable"
        ref="refTable"
        :parentNode="menuNode"
      />

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
  </section>
</template>

<script setup lang="ts">
import ButtonTable from './components/ResourceManage/ButtonTable.vue'
import MenuTable from './components/ResourceManage/MenuTable.vue'
import TreeMenu from './components/ResourceManage/TreeMenu.vue'
import useAppStore from '@/store/app'

defineOptions({
  name: 'ResourceManage',
  inheritAttrs: false
})

const menuNode = ref({} as Record<string, any>)
const refTable = ref(null as InstanceType<typeof ButtonTable> | InstanceType<typeof MenuTable> | null)
const collapse = ref(false as boolean)
const appStore = useAppStore()

const queryTable = (node: Record<string, any>) => {
  menuNode.value = node

  nextTick(() => {
    if (!node.resourceId) {
      refTable.value?.doTableClear()
    }

    if (node.resourceId) {
      refTable.value!.queryParams.parentId = node.resourceId
      refTable.value!.doTableRefresh()
    }
  })
}
</script>

<style lang="less" scoped>
.section-container {
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  height: v-bind('appStore.layoutViewStyle.minHeight');
  padding: 20px;
  position: relative;

  & > .section-left-container {
    flex: 0 0 auto;
    width: 334px;
    height: 100%;
    transition: width 0.25s ease;
    position: relative;
    z-index: 30;

    .section-left-tree {
      width: 310px;
      height: 100%;
      overflow: hidden;
      background-color: #ffffff;
      border-radius: 4px;
    }
  }

  & > .section-right-container {
    flex: 1 1 auto;
    display: flex;
    flex-flow: column nowrap;
    width: calc(100% - 334px);
    height: 100%;
    position: relative;
    z-index: 50;

    .section-tree-collapse {
      font-size: 18px;
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
