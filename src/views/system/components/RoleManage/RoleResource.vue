<template>
  <section class="role-resource-drawer-container">
    <ADrawer
      :open="open"
      :title="title"
      :width="'100%'"
      :zIndex="1010"
      :maskClosable="true"
      :bodyStyle="{ height: 'calc(100% - 55px)', padding: '15px' }"
      :contentWrapperStyle="{ 'max-width': '1180px' }"
      @afterOpenChange="() => open && queryMenus()"
      @close="doClose()"
    >
      <div
        class="flex-row-auto"
        style="width: 100%; height: calc(100% - 55px)"
      >
        <div
          class="flex-row-none"
          style="width: 310px; height: 100%; margin-right: 24px;"
        >
          <ACard
            title="菜单资源"
            style="display: flex; flex-flow: column nowrap; width: 100%; height: 100%"
            :bodyStyle="{ width: '100%', height: '100%', flex: '1 1 auto', padding: '15px 24px', overflow: 'auto', position: 'relative' }"
            :headStyle="{ flex: '0 0 auto', overflow: 'hidden' }"
          >
            <STree
              ref="tree"
              v-model:checkedKeys="menuCheckKeys"
              :loading="loadings.tree"
              :treeData="menuTrees"
              :replaceFields="replaceFields"
              :allowCheckedLevel="2"
              :allowSelectedLevel="2"
              :allowSelectToCheck="true"
              :allowUnSelected="true"
              :allowUnChecked="true"
              :selectable="false"
              :checkedMode="'link'"
              :checkable="true"
              :showIcon="false"
              :showLine="true"
              :tooltip="true"
              @check="doTreeCheck"
            >
              <template #titleRootButton>
                <span class="s-tree-title-button always-show">
                  <AButton
                    ghost
                    size="small"
                    type="primary"
                    style="margin: 0 3px"
                    @click.stop="doTreeAllCollapsed"
                  >
                    <template #icon>
                      <FolderOutlined />
                    </template>
                  </AButton>

                  <AButton
                    ghost
                    size="small"
                    type="primary"
                    style="margin: 0 3px"
                    @click.stop="doTreeAllExpanded"
                  >
                    <template #icon>
                      <FolderOpenOutlined />
                    </template>
                  </AButton>
                </span>
              </template>
            </STree>
          </ACard>
        </div>

        <div
          class="flex-row-auto"
          style="width: 100%; height: 100%;"
        >
          <ACard
            title="按钮资源"
            style="display: flex; flex-flow: column nowrap; width: 100%; height: 100%"
            :bodyStyle="{ width: '100%', height: '100%', flex: '1 1 auto', padding: '15px 24px', overflow: 'auto', position: 'relative' }"
            :headStyle="{ flex: '0 0 auto', overflow: 'hidden' }"
          >
            <ASpin :spinning="loadings.button">
              <div class="resource-button-container">
                <div
                  v-for="button of buttonSortList"
                  :key="button.id"
                  class="resource-button-group"
                >
                  <div class="group-header">
                    <ACheckbox
                      style="margin: 0 6px 0 4px"
                      :checked="isButtonAllChecked(button)"
                      :indeterminate="isButtonHasChecked(button)"
                      @change="doButtonCheck({ button, option: null })"
                    />

                    <ABreadcrumb>
                      <ABreadcrumbItem
                        v-for="text of button.titles"
                        :key="text"
                      >
                        {{ text }}
                      </ABreadcrumbItem>
                    </ABreadcrumb>
                  </div>

                  <div class="group-content">
                    <div
                      v-for="option of button.options"
                      :key="option.value"
                      class="group-checkbox"
                    >
                      <ACheckbox
                        :title="option.label"
                        :checked="button.selected.includes(option.value)"
                        @change="doButtonCheck({ button, option })"
                      >
                        {{ option.label }}
                      </ACheckbox>
                    </div>
                  </div>
                </div>
              </div>
            </ASpin>
          </ACard>
        </div>
      </div>

      <!-- 按钮组 -->
      <div class="drawer-body-footer">
        <div class="drawer-body-footer-fixed">
          <AButton @click="doClose()">
            取消
          </AButton>
          <AButton
            type="primary"
            :loading="loadings.submitting"
            @click="doSubmit()"
          >
            保存
          </AButton>
        </div>
      </div>
    </ADrawer>
  </section>
</template>

<script setup lang="ts">
import Message from 'ant-design-vue/es/message'
import Notification from 'ant-design-vue/es/notification'
import { treeEmitCheckDefiner } from '@antd-templater/library-3.x'
import { requestBuilder } from '@/utils/common'
import * as resourceApi from '@/api/resource'

export interface Emits {
  (e: 'submitted'): void;
  (e: 'closed'): void;
}

defineOptions({
  name: 'RoleResource',
  inheritAttrs: false
})

// emits
const emits = defineEmits<Emits>()

// 弹窗
const open = ref(false)
const title = ref('')
const action = ref('')
const record = ref({} as Record<string, any>)
const loadings = ref({
  tree: false,
  button: false,
  submitting: false
})

// 菜单资源
const tree = ref(null as InstanceType<STree> | null)
const menuTrees = ref([] as Array<{ label: string; value: string; children: any[] }>)
const menuCheckKeys = ref([] as Array<string>)
const replaceFields = {
  key: 'value',
  title: 'label'
}

// 按钮资源
const buttonList = ref([] as Array<{ id: string; actionsOptions: Record<string, any>[], selected: string[]; }>)
const buttonSortList = ref([] as Array<{ id: string; menu: Record<string, any>, titles: string[]; options: Record<string, any>[]; selected: string[]; }>)
const buttonCheckKeys = ref([] as Array<string>)

const queryMenus = async() => {
  if (!loadings.value.tree) {
    loadings.value.tree = true
  }

  if (!loadings.value.button) {
    loadings.value.button = true
  }

  return resourceApi.getResourceMenuByRole({ roleId: record.value.roleId }).then(res => {
    if (res.code !== '0000') {
      if (res.message) {
        Message.error(res.message)
      }
      return Promise.reject()
    }

    menuTrees.value = res.result.treeNodes
    menuCheckKeys.value = res.result.treeSelect

    nextTick(() => { tree.value?.doTreeAllExpanded() })
    queryButton([...menuCheckKeys.value])
  })
}

const queryButton = async(values: Array<string>) => {
  if (!loadings.value.button) {
    loadings.value.button = true
  }

  const params = requestBuilder(
    '',
    values.map(value => ({
      roleId: record.value.roleId,
      menuId: value
    }))
  )

  const promise = resourceApi.getResourceButtonByRole(params).then(res => {
    if (res.code !== '0000') {
      if (res.message) {
        Message.error(res.message)
      }
      return Promise.reject()
    }

    buttonList.value = res.result.map((button: any) => {
      return {
        ...button,
        selected: button.selected.filter((key: string) => button.actionsOptions.some((opt: any) => opt.value === key))
      }
    })

    doButtonSort()
  })

  promise.finally(() => {
    loadings.value.tree = false
    loadings.value.button = false
  })

  return promise
}

const doTreeCheck = treeEmitCheckDefiner(options => {
  if (!tree.value) {
    return
  }

  const checkedKeys = [...options.checkedKeys] as string[]

  menuCheckKeys.value = checkedKeys

  queryButton(checkedKeys)
})

const doButtonCheck = (options: { button: any, option: any }) => {
  const button = options.button
  const option = options.option

  if (!option) {
    !button.options.every((opt: any) => button.selected.includes(opt.value))
      ? (button.selected = button.options.map((opt: any) => opt.value))
      : (button.selected = [])
  }

  if (option) {
    button.selected.includes(option.value)
      ? (button.selected = button.selected.filter((value: any) => value !== option.value))
      : button.selected.push(option.value)
  }

  buttonCheckKeys.value = buttonSortList.value.flatMap(button => button.selected)
}

const isButtonAllChecked = (button: { options: any[], selected: string[] }) => {
  return button.options.every(option => button.selected.includes(option.value))
}

const isButtonHasChecked = (button: { options: any[], selected: string[] }) => {
  return (
    !button.options.every(option => button.selected.includes(option.value)) &&
    button.options.some(option => button.selected.includes(option.value))
  )
}

const doTreeAllCollapsed = () => {
  tree.value?.doTreeAllCollapsed()
}

const doTreeAllExpanded = () => {
  tree.value?.doTreeAllExpanded()
}

const doButtonSort = () => {
  buttonList.value = buttonList.value.filter(button => {
    return (
      button.actionsOptions &&
      button.actionsOptions.length > 0 &&
      menuCheckKeys.value.some(key => key === button.id)
    )
  })

  buttonList.value.sort((a, b) => (
    menuCheckKeys.value.findIndex(key => key === a.id) -
    menuCheckKeys.value.findIndex(key => key === b.id)
  ))

  buttonSortList.value = buttonList.value.map(button => {
    const menu = tree.value!.pickMatchTreeNode(button.id)!
    const parents = tree.value!.pickUpperTreeNodes(button.id)!

    if (!button.actionsOptions) {
      button.actionsOptions = []
    }

    if (!button.selected) {
      button.selected = []
    }

    // 返回
    return {
      menu,
      titles: [...parents.map(node => node.label), menu.label],
      options: button.actionsOptions,
      selected: button.selected,
      id: button.id
    }
  })

  buttonCheckKeys.value = buttonSortList.value.flatMap(button => button.selected)
}

const doOpen = (source: Record<string, any>) => {
  open.value = true
  title.value = '资源配置'
  action.value = 'update'
  record.value = source
  loadings.value = {
    tree: false,
    button: false,
    submitting: false
  }
}

const doClose = () => {
  if (open.value) {
    // 弹窗
    open.value = false
    title.value = ''
    action.value = ''
    record.value = {}
    loadings.value = {
      tree: false,
      button: false,
      submitting: false
    }

    // 菜单资源
    menuTrees.value = []
    menuCheckKeys.value = []

    // 按钮资源
    buttonList.value = []
    buttonSortList.value = []
    buttonCheckKeys.value = []

    // 通知
    emits('closed')
  }
}

const doSubmit = () => {
  const roleId = record.value.roleId
  const resources = [...menuCheckKeys.value, ...buttonCheckKeys.value]
  const resourceIds = resources.join(',')

  if (!loadings.value.submitting) {
    loadings.value.submitting = true
  }

  const promise = resourceApi.modifyResoureInfoByRole({ roleId, resourceIds })
    .then(res => {
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

      emits('submitted')
      doClose()
    })

  promise.finally(() => {
    loadings.value.submitting = false
  })

  return promise
}

defineExpose({
  doClose,
  doOpen
})
</script>

<style lang="less" scoped>
.ant-spin-nested-loading,
.ant-spin-container {
  width: 100%;
  height: 100%;
}

.resource-button-container {
  width: 100%;
  height: 100%;
  overflow: auto;

  .resource-button-group {
    width: 100%;
    height: auto;

    &:not(:last-child) {
      margin-bottom: 24px;
    }

    .group-header {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      align-content: center;
      height: 40px;
      padding: 5px 16px 5px 10px;
      margin-bottom: 2px;
      color: #545665;
      font-size: 14px;
      font-weight: 600;
      border-radius: 5px;
      background-color: #f0f4ff;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;

      :deep(.ant-checkbox-wrapper) {
        opacity: 0.9;
      }
    }

    .group-content {
      display: flex;
      flex-flow: row wrap;
      align-items: center;
      align-content: center;
      & > .group-checkbox {
        flex: 0 0 auto;
        max-width: 60%;
        padding: 5px 5px 5px 10px;
        margin: 4px 5px;
        border-radius: 3px;
        font-size: 14px;
        font-weight: 600;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    }
  }
}
</style>
