<template>
  <n-menu :options="menus" />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"

export default defineComponent({
  name: "AsideMenu",
  setup() {
    const menus = ref<any[]>([])
    menus.value = [
      {
        disabled: false,
        key: "home",
        label: "首页",
        show: true,
      },
    ]
    return {
      menus,
    }
  },
})
</script>
