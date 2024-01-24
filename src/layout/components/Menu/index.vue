<template>
  <n-menu :options="menus" />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"

export default defineComponent({
  name: "AsideMenu",
  setup() {
    const menus = ref<any[]>([])

    // function updateMenu() {
    //   menus.value = generatorMenu()
    // }

    return {
      menus,
    }
  },
})
</script>
