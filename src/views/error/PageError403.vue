<template>
  <div class="page-container">
    <AResult
      title="403"
      status="403"
      subTitle="抱歉，您无权访问此页!"
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
defineOptions({ name: 'PageError403' })
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
