<template>
  <section class="tree-menu-container">
    <ACard
      title="菜单资源"
      style="display: flex; flex-flow: column nowrap; height: 100%;"
      :headStyle="cardHeadStyle"
      :bodyStyle="cardBodyStyle"
      :bordered="false"
    >
      <STree
        ref="tree"
        :loading="loading"
        :treeData="menuTree"
        :replaceFields="replaceFields"
        :allowCheckedLevel="2"
        :allowSelectedLevel="2"
        :selectable="true"
        :checkable="false"
        :blockNode="true"
        :showIcon="false"
        :showLine="true"
        :tooltip="true"
        :sticky="true"
        bgColor="#ffffff"
        @select="doLinkage"
      >
        <!-- 根节点 新增/删除/修改 -->
        <template #titleRootButton="node">
          <AButton
            type="link"
            size="small"
            @click.stop="doDrawerAdd(node)"
          >
            <template #icon>
              <PlusOutlined />
            </template>
          </AButton>

          <AButton
            type="link"
            size="small"
            @click.stop="doAllCollapse"
          >
            <template #icon>
              <FolderOutlined />
            </template>
          </AButton>

          <AButton
            type="link"
            size="small"
            @click.stop="doTreeAllExpand"
          >
            <template #icon>
              <FolderOpenOutlined />
            </template>
          </AButton>
        </template>

        <!-- 父节点 新增/删除/修改 -->
        <template #titleParentButton="node">
          <AButton
            type="link"
            size="small"
            @click.stop="doDrawerAdd(node)"
          >
            <template #icon>
              <PlusOutlined />
            </template>
          </AButton>

          <AButton
            type="link"
            size="small"
            @click.stop="doDrawerEdit(node)"
          >
            <template #icon>
              <EditOutlined />
            </template>
          </AButton>

          <AButton
            type="link"
            size="small"
            style="color: #f44848"
            @click.stop="doDrawerDel(node)"
          >
            <template #icon>
              <DeleteOutlined />
            </template>
          </AButton>
        </template>

        <!-- 叶子节点 新增/删除/修改 -->
        <template #titleLeafButton="node">
          <AButton
            type="link"
            size="small"
            @click.stop="doDrawerAdd(node)"
          >
            <template #icon>
              <PlusOutlined />
            </template>
          </AButton>

          <AButton
            type="link"
            size="small"
            @click.stop="doDrawerEdit(node)"
          >
            <template #icon>
              <EditOutlined />
            </template>
          </AButton>

          <AButton
            type="link"
            size="small"
            style="color: #f44848"
            @click.stop="doDrawerDel(node)"
          >
            <template #icon>
              <DeleteOutlined />
            </template>
          </AButton>
        </template>
      </STree>
    </ACard>

    <MenuDrawer
      ref="menuDrawer"
      @submitted="doQuery"
      @deleted="doQuery"
    />
  </section>
</template>

<script setup lang="ts">

import { CSSProperties, createVNode, render } from 'vue'
import { treeEmitSelectDefiner } from '@antd-templater/antd-template-lib3.x'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
import { requestBuilder, rawValue } from '@/utils/common'
import * as resourceApi from '@/api/resource'

import Message from 'ant-design-vue/es/message'
import ConfirmDialog from 'ant-design-vue/es/modal/ConfirmDialog'
import MenuDrawer from './MenuDrawer.vue'

export interface Emits {
  (e: 'linkage', opt: { node: object, info: object; }): void;
}

defineOptions({
  name: 'TreeMenu',
  inheritAttrs: false
})

const cardHeadStyle: CSSProperties = {
  flex: '0 0 auto',
  overflow: 'hidden'
}

const cardBodyStyle: CSSProperties = {
  flex: '1 1 auto',
  overflow: 'hidden',
  position: 'relative'
}

const replaceFields: Ref<STreeFieldNames> = ref({
  key: 'value',
  title: 'label',
  children: 'children'
})

const emits = defineEmits<Emits>()
const tree = ref(null as InstanceType<STree>| null)
const menuDrawer = ref(null as InstanceType<typeof MenuDrawer>| null)
const menuInfos = ref([] as Record<string, any>[])
const menuTree = ref([] as Record<string, any>[])
const loading = ref(false)

const doQuery = () => {
  if (!loading.value) {
    loading.value = true

    const params = requestBuilder('', { resourceType: 'm' })
    const promise = resourceApi.getResourceMenuAll(params).then(res => {
      if (res.code !== '0000') {
        Message.error('菜单资源加载失败')
        return Promise.reject()
      }
      menuTree.value = res.result.treeNodes
      menuInfos.value = res.result.nodes

      nextTick(() => doTreeAllExpand())
    })

    promise.finally(() => {
      loading.value = false
    })

    return promise
  }
}

const doAllCollapse = () => {
  tree.value?.doTreeAllCollapsed()
}

const doTreeAllExpand = () => {
  tree.value?.doTreeAllExpanded()
}

const doLinkage = treeEmitSelectDefiner(options => {
  emits('linkage', {
    node: options.selectedNode!,
    info: rawValue(menuInfos.value.find(menu => menu.resourceId === options.selectedNode!.value)!)
  })
})

const doDrawerAdd = (record: Record<string, any>) => {
  menuDrawer.value?.doAdd({ parentId: record.value })
}

const doDrawerEdit = (record: Record<string, any>) => {
  menuDrawer.value?.doEdit(menuInfos.value.find(menu => menu.resourceId === record.value))
}

const doDrawerDel = (record: Record<string, any>) => {
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
    onCancel: () => { dialog.component!.props.visible = false },
    onOk: () => {
      menuDrawer.value?.doDel([record]).finally(() => {
         dialog.component!.props.visible = false
      })
    }
  })

  // Render Modal.confirm
  render(dialog, element)
}

doQuery()
</script>

<style lang="less" scoped>
.tree-menu-container {
  width: 100%;
  height: 100%;
  overflow: auto;
}
</style>
./MenuDrawer.vue
