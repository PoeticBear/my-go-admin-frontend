import { RouteRecordRaw } from "vue-router"

export const generateDynamicRouter = async (): Promise<RouteRecordRaw[]> => {
  const result = await adminMenus()
  console.log(result)
  const router = generateRoutes()
  return router
}

export const generateRoutes = (): any[] => {
  return []
}

export const adminMenus = async () => {
  return []
}
