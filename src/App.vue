<template>
  <NConfigProvider
    :locale="zhCN"
    :theme-overrides="getThemeOverrides"
    :date-locale="dateZhCN"
  >
    <AppProvider>
      <RouterView />
    </AppProvider>
  </NConfigProvider>
</template>

<script lang="ts" setup>
import { computed } from "vue"
import { zhCN, dateZhCN } from "naive-ui"
import { AppProvider } from "@/components/Application"
import { useDesignSettingStore } from "@/store/modules/designSetting"
// import { lighten } from "@/utils/index"

const designStore = useDesignSettingStore()

/**
 * @type import('naive-ui').GlobalThemeOverrides
 */
const getThemeOverrides = computed(() => {
  const appTheme = designStore.appTheme
  // const lightenStr = lighten(designStore.appTheme, 6)
  return {
    common: {
      primaryColor: appTheme,
      // primaryColorHover: lightenStr,
      // primaryColorPressed: lightenStr,
      primaryColorSuppl: appTheme,
    },
    LoadingBar: {
      colorLoading: appTheme,
    },
  }
})
</script>

<style>
/* @import "styles/index.less"; */
</style>
