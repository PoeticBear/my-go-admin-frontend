import { defineStore } from "pinia"
import { store } from "@/store"
import { storage } from "@/utils/Storage"
import { ACCESS_TOKEN, CURRENT_USER } from "../mutation-types"
import {
  getUserInfo as getUserInfoApi,
  login as loginApi,
} from "@/api/system/user"
import { ResultEnum } from "@/enums/httpEnum"
import type { GetUserInfoParams } from "@/types/apiTypes"
import pino from "pino"
import pinoPretty from "pino-pretty"
import { log } from "winston"

export type UserInfoType = {
  id: number
  username: string
}

export interface IUserState {
  user: UserInfoType
  token: string
  roles: string[]
  permissions: object[]
}
const logger = pino()

export const useUserStore = defineStore({
  id: "app-user",
  state: (): IUserState => ({
    user: storage.get(CURRENT_USER, {}),
    token: storage.get(ACCESS_TOKEN, ""),
    roles: [],
    permissions: [],
  }),
  getters: {
    getUserInfo(): UserInfoType {
      return this.user
    },
    getToken(): string {
      return this.token
    },
    getRoles(): string[] {
      return this.roles
    },
    getPermissions(): object[] {
      return this.permissions
    },
  },
  actions: {
    setUserInfo(info: UserInfoType): void {
      this.user = info
    },
    setToken(token: string): void {
      this.token = token
    },
    setRoles(roles: string[]): void {
      this.roles = roles
    },
    setPermissions(permissions: object[]): void {
      this.permissions = permissions
    },

    /**
     * @description: 登录
     */
    async login(params: any) {
      const response = await loginApi(params)
      const { status, data } = response as any
      const { user, token, roles, permissions } = data

      if (status === ResultEnum.SUCCESS) {
        localStorage.setItem("token", token)
        this.setUserInfo(user)
        this.setToken(token)
        this.setRoles(roles)
        this.setPermissions(permissions)
      }
      return response
    },

    async getInfo() {
      const params: GetUserInfoParams = {
        token: this.token,
      }
      const { data } = await getUserInfoApi(params)
      logger.info(data, "data")
      if (data.permissions.length > 0 && data.permissions) {
        const permissionsList = data.permissions
        logger.info(permissionsList, "permissionsList")
        this.setPermissions(permissionsList)
      } else {
        throw Error("getInfo: permissionsList must be a non-null array !")
      }
      return data
    },

    /**
     * @description: 登出
     */
    async logout() {
      this.setPermissions([])
      this.setUserInfo({} as UserInfoType)
      this.setToken("")
      localStorage.removeItem("token")
    },
  },
})

export function useUser() {
  return useUserStore(store)
}
