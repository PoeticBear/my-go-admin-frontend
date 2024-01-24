import { defineStore } from "pinia"
import { RouteRecordRaw } from "vue-router"
import { constantRouter } from "@/router/index"
import { toRaw } from "vue"
import { store } from "@/store"

export interface IAsyncRouteState {
  menus: RouteRecordRaw[]
  routers: any[]
  routersAdded: any[]
  keepAliveComponents: string[]
  isDynamicRouteAdded: boolean
}

export const useAsyncRouteStore = defineStore({
  id: "app-async-route",
  state: (): IAsyncRouteState => ({
    menus: [],
    routers: constantRouter,
    routersAdded: [],
    keepAliveComponents: [],
    isDynamicRouteAdded: false,
  }),
  getters: {
    getMenus(): RouteRecordRaw[] {
      return this.menus
    },
    getIsDynamicRouteAdded(): boolean {
      return this.isDynamicRouteAdded
    },
  },
  actions: {
    getRouters() {
      return toRaw(this.routersAdded)
    },
    setIsDynamicRouteAdded(added: boolean) {
      this.isDynamicRouteAdded = added
    },
    setRouters(routers: RouteRecordRaw[]) {
      this.routersAdded = routers
      this.routers = constantRouter.concat(routers)
    },
    setMenus(menus: RouteRecordRaw[]) {
      this.menus = menus
    },

    async generateRoutes(data) {
      console.log(data)
      let accessedRouters
      // accessedRouters = await generateDynamicRouter()
      this.setMenus(accessedRouters)
      this.setRouters(accessedRouters)
      return toRaw(accessedRouters)
    },
  },
})

// Need to be used outside the setup
export function useAsyncRoute() {
  return useAsyncRouteStore(store)
}
