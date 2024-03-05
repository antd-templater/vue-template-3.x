<template>
  <section class="organize-query-container">
    <AForm layout="inline">
      <div class="flex-row-auto">
        <div class="flex-row-none">
          <AFormItem
            label="组织/部门"
            :style="{ width: config.componentSize === 'large' ? '380px' : config.componentSize === 'middle' ? '330px' : '270px' }"
          >
            <AInputSearch
              v-model:value="params.userNo"
              placeholder="请输入用户名"
              allowClear
              @search="doQuery"
            >
              <template #enterButton>
                <AButton>
                  <template #icon>
                    <SearchOutlined style="color: var(--ant-primary-color)" />
                  </template>
                </AButton>
              </template>
            </AInputSearch>
          </AFormItem>
        </div>

        <div class="flex-row-auto">
          <div style="flex: 1 1 auto">
            <AButton @click="doFilter">
              <template #icon>
                <FilterOutlined style="color: var(--ant-primary-color)" />
              </template>
            </AButton>
          </div>

          <div style="flex: 0 0 auto">
            <AButton
              v-action:add
              type="primary"
              @click="doAdd"
            >
              <span>新增</span>
              <template #icon>
                <PlusOutlined />
              </template>
            </AButton>
          </div>
        </div>
      </div>

      <div
        v-if="visible"
        class="form-inline-more"
      >
        <div
          class="flex-row-none"
          style="width: 210px"
        >
          <AFormItem
            label="组织状态"
            style="margin-bottom: 0"
          >
            <ASelect
              v-model:value="params.activity"
              placeholder="请选择角色状态"
              @change="doQuery"
            >
              <ASelectOption value>
                全部
              </ASelectOption>

              <ASelectOption value="Y">
                启用
              </ASelectOption>

              <ASelectOption value="N">
                禁用
              </ASelectOption>
            </ASelect>
          </AFormItem>
        </div>

        <div class="flex-row-auto">
          <AButton
            type="primary"
            style="margin: 0 8px"
            @click="doQuery"
          >
            查询
          </AButton>

          <AButton
            style="margin: 0 8px"
            @click="doReset(true)"
          >
            重置
          </AButton>
        </div>
      </div>
    </AForm>
  </section>
</template>

<script setup lang="ts">
import { defaultConfigProvider } from 'ant-design-vue/es/config-provider'

export interface Emits {
  (e: 'addRecord'): void;
  (e: 'queryTable', opt: any): void;
}

defineOptions({
  name: 'UserQuery',
  inheritAttrs: false
})

const emits = defineEmits<Emits>()
const params = ref({ userNo: '', activity: '' })
const config = inject('configProvider', defaultConfigProvider)
const visible = ref(false)

const doAdd = () => { emits('addRecord') }
const doQuery = () => { emits('queryTable', params.value) }
const doFilter = () => { visible.value = !visible.value }

const doReset = (query: boolean) => {
  params.value.userNo = ''
  params.value.activity = ''

  if (query === true) {
    doQuery()
  }
}
</script>

<style lang="less" scoped>
.organize-query-container {
  width: 100%;
  height: auto;
  padding: 0 5px;

  .form-inline-more {
    display: flex;
    width: 100%;
    padding: 12px 15px;
    margin-top: 8px;
    background: #fafafd;
    border: 1px solid #e3e5f1;
    border-radius: 4px;
    position: relative;

    &::before {
      content: '';
      width: 0;
      height: 0;
      position: absolute;
      top: -8px;
      left: 352px;
      border: solid 8px #e3e5f1;
      border-top: none;
      border-left-color: transparent;
      border-right-color: transparent;
    }

    &::after {
      content: '';
      width: 0;
      height: 0;
      position: absolute;
      top: -6px;
      left: 354px;
      border: solid 6px #fafafd;
      border-top: none;
      border-left-color: transparent;
      border-right-color: transparent;
    }
  }

  :deep(.ant-input-affix-wrapper:focus),
  :deep(.ant-input-affix-wrapper-focused) {
    border-color: #d9d9d9;
    box-shadow: none;
    outline: 0;
  }
}
</style>
