<template>
  <section class="organize-tree-container">
    <ACard
      title="组织列表"
      :style="cardStyle"
      :bodyStyle="bodyStyle"
      :headStyle="headStyle"
      :bordered="false"
    >
      <template #extra>
        <AButton
          ghost
          type="primary"
          style="margin: 0 5px"
          @click="doAdd()"
        >
          <template #icon>
            <PlusOutlined />
          </template>
        </AButton>

        <AButton
          ghost
          type="primary"
          style="margin: 0 5px"
          @click="doRefresh()"
        >
          <template #icon>
            <RedoOutlined />
          </template>
        </AButton>
      </template>

      <STree
        ref="tree"
        v-model:treeData="treeData"
        v-model:expandedKeys="expandedKeys"
        v-model:selectedKeys="selectedKeys"
        :fieldNames="fieldNames"
        :allowAutoExpandLoad="true"
        :allowAutoExpanded="true"
        :allowSelectedLevel="1"
        :allowCheckedLevel="1"
        :selectable="true"
        :checkable="false"
        :showIcon="false"
        :showLine="false"
        :tooltip="true"
        :blockNode="true"
        :loading="loading"
        :loadData="doQuery"
        @change="doChange"
        @select="doLinkage"
      />
    </ACard>
  </section>
</template>

<script setup lang="ts">
import { CSSProperties } from 'vue'
import { requestBuilder } from '@/utils/common'
import * as organizeApi from '@/api/organize'

export interface Emits {
  (e: 'queryTable', opt: { orgId: string; deptId: string; }): void;
  (e: 'selectedNode', opt: STreePartSourceNode): void;
  (e: 'addRecord'): void;
}

defineOptions({
  name: 'OrganizeTree',
  inheritAttrs: false,
})

const cardStyle: CSSProperties = {
  display: 'flex',
  flexFlow: 'column nowrap',
  flex: '1 1 auto',
  width: '100%',
  height: '100%',
  overflow: 'hidden',
}

const bodyStyle: CSSProperties = {
  display: 'flex',
  padding: '15px 10px',
  flexFlow: 'column nowrap',
  flex: '1 1 auto',
  position: 'relative',
  overflow: 'auto',
}

const headStyle: CSSProperties = {
  flex: '0 0 auto',
  overflow: 'hidden',
}

const emits = defineEmits<Emits>()
const tree = ref(null as InstanceType<STree> | null)
const treeData = ref([] as any)
const loading = ref(false as boolean)
const loadedKeys = ref([] as STreeKeys)
const selectedKeys = ref([] as STreeKeys)
const expandedKeys = ref([] as STreeKeys)
const fieldNames = ref({ children: 'children', title: 'title', key: 'key' })

const doRefresh = (_options?: Record<string, any>) => {
  if (!loading.value) {
    loading.value = true

    const promises = []
    const expandKeys = [...expandedKeys.value]
    const selectKeys = [...selectedKeys.value]
    const loadingKeys = new Set(['0', ...loadedKeys.value])

    loadedKeys.value = []
    expandedKeys.value = []
    selectedKeys.value = []

    for (const key of loadingKeys) {
      const promise = Promise.resolve(doQuery({ key })).then(result => {
        return {
          parent: key !== '0' ? { key } : null,
          children: result || [],
        }
      })

      promises.push(promise.catch(() => {}))
    }

    return Promise.all(promises)
      .then(nodes => {
        for (const node of nodes) {
          if (node) {
            tree.value?.reloadTreeNodes(node.children, node.parent?.key)
          }
        }

        tree.value?.doTreeOnlyExpanded(expandKeys)
        tree.value?.doTreeSelected(selectKeys)

        loadedKeys.value = [...loadingKeys]
        loading.value = false
      })
  }
}

const doLinkage = treeEmitSelectDefiner(options => {
  emits('selectedNode', options.selectedNode)

  emits('queryTable', {
    orgId: options.selectedNode?.isOrg === 'Y' ? options.selectedNode.key : '',
    deptId: options.selectedNode?.isOrg === 'N' ? options.selectedNode.key : '',
  })
})

const doChange = treeEmitChangeDefiner(options => {
  loadedKeys.value = [...options.loadedKeys]
})

const doQuery = treeLoadDataDefiner(options => {
  const params = requestBuilder(
    '',
    { orgId: options.key },
    null,
    null,
  )

  return organizeApi.getOrganizeInfoTree(params).then(res => {
    if (res.code !== '0000') {
      return Promise.reject()
    }
    return res.result
  })
})

const doAdd = () => {
  emits('addRecord')
}

onMounted(() => {
  doRefresh()
})

defineExpose({
  doRefresh,
})
</script>

<style lang="less" scoped>
.organize-tree-container {
  width: 100%;
  height: 100%;
}
</style>
