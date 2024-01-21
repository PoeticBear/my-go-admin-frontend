import { PageEnum } from "@/enums/pageEnum"
import { App } from "vue"
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import { Layout } from "@/router/constant"
// import { PageEnum } from "@/enums/pageEnum";

// import type { IModuleType } from "./types"

// const modules = import.meta.glob<IModuleType>("./modules/**/*.ts", {
//   eager: true,
// })

// const routeModuleList: RouteRecordRaw[] = Object.keys(modules).reduce((list, key) => {
//   const mod = modules[key].default ?? {};
//   const modList = Array.isArray(mod) ? [...mod] : [mod];
//   return [...list, ...modList];
// }, []);

// function sortRoute(a:any,b:any){
//   return (a.meta?.sort ?? 0) - (b.meta?.sort ?? 0);
// }

// routeModuleList.sort(sortRoute);

export const RootRoute: RouteRecordRaw = {
  path: "/",
  name: "Root",
  redirect: PageEnum.BASE_HOME,
  meta: {
    title: "Root",
  },
}

export const LoginRoute: RouteRecordRaw = {
  path: "/login",
  name: "Login",
  component: () => import("@/views/login/index.vue"),
  meta: {
    title: "Login",
  },
}

export const UserRoute: RouteRecordRaw = {
  path: "/user",
  name: "User",
  redirect: "/user/list",
  component: Layout,
  meta: {
    title: "用户管理",
    icon: "user",
  },
  children: [
    {
      path: "list",
      name: "list",
      meta: {
        title: "用户列表",
        icon: "user",
      },
      component: () => import("@/views/user/list/index.vue"),
    },
  ],
}

export const asyncRoutes = []

export const unAuthRoutes = [RootRoute, LoginRoute, UserRoute]

const router = createRouter({
  history: createWebHistory(),
  routes: unAuthRoutes,
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

export function setupRouter(app: App) {
  app.use(router)
  // create router guard
  // createRouterGuards(router)
}

export default router
