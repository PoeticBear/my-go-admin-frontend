<template>
  <n-layout
    class="layout"
    has-sider
  >
    <n-layout-sider class="layout-sider">
      <AsideMenu />
    </n-layout-sider>

    <n-layout>
      <n-layout-header>
        <PageHeader />
      </n-layout-header>
      <n-layout-content>
        <MainView />
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<script lang="ts" setup>
import { AsideMenu } from "./components/Menu"
import { MainView } from "./components/Main"
import { PageHeader } from "./components/Header"
</script>

<style lang="less" scoped>
.layout {
  display: flex;
  flex-direction: row;
  flex: auto;
  &-default-background {
    background: #f5f7f9;
  }

  .layout-sider {
    min-height: 100vh;
    box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);
    position: relative;
    z-index: 13;
    transition: all 0.2s ease-in-out;
  }

  .n-layout-header.n-layout-header--absolute-positioned {
    z-index: 11;
  }
}
</style>
