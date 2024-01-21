import { RouteRecordRaw } from "vue-router"
import { Layout } from "@/router/constant"

const routes: Array<RouteRecordRaw> = [
  {
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
  },
]

export default routes
