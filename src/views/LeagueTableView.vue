<template>
  <div>
    <button @click="logout">退出登录</button>
    <n-space vertical size="large">
      <n-layout>
        <n-layout-header>soccer data</n-layout-header>
        <n-layout has-sider>
          <n-layout-sider content-style="padding: 24px;">
            积分榜
          </n-layout-sider>
          <n-layout-content content-style="padding: 24px;">
            <n-data-table
              :data="leagueTables"
              :columns="[
                { title: '球队名称', key: 'cleanName' },
                { title: '积分', key: 'points' },
                { title: '排名', key: 'position' },
              ]"
            />
          </n-layout-content>
        </n-layout>
        <n-layout-footer>GPT</n-layout-footer>
      </n-layout>
    </n-space>
  </div>
</template>

<script lang="ts">
import axios from "axios"
import { defineComponent, onMounted, ref } from "vue"
import { useRouter } from "vue-router"
import {
  NSpace,
  NLayout,
  NLayoutHeader,
  NLayoutSider,
  NLayoutContent,
  NLayoutFooter,
  NDataTable,
} from "naive-ui"

interface LeagueTable {
  cleanName: string
  points: number
  position: number
}

export default defineComponent({
  components: {
    NSpace,
    NLayout,
    NLayoutHeader,
    NLayoutSider,
    NLayoutContent,
    NLayoutFooter,
    NDataTable,
  },

  setup() {
    const router = useRouter()

    const logout = () => {
      localStorage.removeItem("token")
      router.push("/login")
    }

    const leagueTables = ref<LeagueTable[]>([])

    onMounted(async () => {
      console.log("mounted")
      try {
        const res = await axios.get("http://localhost:8081/getLeagueTables")

        leagueTables.value = res.data.map((item: any): LeagueTable => {
          return {
            cleanName: item.cleanName,
            points: item.points,
            position: item.position,
          }
        })
      } catch (error) {
        console.log(error)
      }
    })
    return {
      leagueTables,
      logout,
    }
  },
})
</script>

<style scoped>
.n-layout-header,
.n-layout-footer {
  background: rgba(128, 128, 128, 0.2);
  padding: 24px;
}

.n-layout-sider {
  background: rgba(128, 128, 128, 0.3);
}

.n-layout-content {
  background: rgba(128, 128, 128, 0.4);
}
</style>
