import { PageEnum } from "@/enums/pageEnum"
import { RouteRecordRaw, Router } from "vue-router"
import { useUser } from "@/store/modules/user"
import { useAsyncRoute } from "@/store/modules/asyncRoute"
import logger from "@/plugins/logger"

const unAuthRoutes = [PageEnum.BASE_LOGIN]

export function createRouterGuards(router: Router) {
  const userStore = useUser()
  const asyncRouteStore = useAsyncRoute()

  router.beforeEach(async (to, from, next) => {
    console.log(from.fullPath, "from.fullPath")
    console.log(to.fullPath, "to.fullPath")

    // 无需权限的页面
    if (unAuthRoutes.includes(to.path as PageEnum)) {
      next()
    } else {
      next(PageEnum.BASE_LOGIN)
    }

    const token = localStorage.getItem("token")
    if (!token) {
      console.log("token不存在")
      next(PageEnum.BASE_LOGIN)
      return
    } else {
      console.log("token存在")
      const userInfo = await userStore.getInfo()
      logger.info(userInfo, "userInfo")
      const routes = await asyncRouteStore.generateRoutes(userInfo)
      routes.forEach(route => {
        router.addRoute(route as unknown as RouteRecordRaw)
      })
    }

    // if (asyncRouteStore.getIsDynamicRouteAdded) {
    //   next()
    //   return
    // }

    const redirectPath = (from.query.redirect || to.path) as string
    const redirect = decodeURIComponent(redirectPath)
    const nextData =
      to.path === redirect ? { ...to, replace: true } : { path: redirect }
    asyncRouteStore.setIsDynamicRouteAdded(true)
    next(nextData)
  })

  // router.afterEach((to, from) => {
  //   console.log(to, from)
  // })

  // router.onError(error => {
  //   console.log(error)
  // })
}
