<template>
  <div class="page-container">
    <AResult
      title="500"
      status="500"
      subTitle="抱歉，服务器反馈异常!"
    >
      <template #extra>
        <AButton
          type="primary"
          @click="$router.push({ path: '/index' })"
        >
          返回首页
        </AButton>
      </template>
    </AResult>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="less" scoped>
.page-container {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  position: absolute;
  margin-top: -38px;
  width: 100%;
  height: 100%;
}
</style>
