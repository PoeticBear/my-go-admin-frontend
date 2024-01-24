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

export type UserInfoType = {
  name: string
  email: string
}

export interface IUserState {
  token: string
  username: string
  welcome: string
  avatar: string
  permissions: string[]
  info: UserInfoType
}

export const useUserStore = defineStore({
  id: "app-user",
  state: (): IUserState => ({
    token: storage.get(ACCESS_TOKEN, ""),
    username: "",
    welcome: "",
    avatar: "",
    permissions: [],
    info: storage.get(CURRENT_USER, {}),
  }),
  getters: {
    getToken(): string {
      return this.token
    },
    getUsername(): string {
      return this.username
    },
    getWelcome(): string {
      return this.welcome
    },
    getAvatar(): string {
      return this.avatar
    },
    getPermissions(): string[] {
      return this.permissions
    },
    getUserInfo(): UserInfoType {
      return this.info
    },
  },
  actions: {
    setToken(token: string): void {
      this.token = token
    },
    setUsername(username: string): void {
      this.username = username
    },
    setWelcome(welcome: string): void {
      this.welcome = welcome
    },
    setAvatar(avatar: string): void {
      this.avatar = avatar
    },
    setPermissions(permissions: string[]): void {
      this.permissions = permissions
    },
    setInfo(info: UserInfoType): void {
      this.info = info
    },

    /**
     * @description: 登录
     */
    async login(params: any) {
      const response = await loginApi(params)
      const { status, data } = response as any
      const { token } = data

      if (status === ResultEnum.SUCCESS) {
        localStorage.setItem("token", token)
        this.setToken(token)
      }
      return response
    },

    async getInfo(params?: GetUserInfoParams) {
      params = {
        userId: 14,
      }
      const result: any = await getUserInfoApi(params)
      if (result.permissions.length > 0 && result.permissions) {
        const permissionsList = result.permissions
        this.setPermissions(permissionsList)
        this.setInfo(result)
      } else {
        throw Error("getInfo: permissionsList must be a non-null array !")
      }
      // this.setAvatar(result.avatar)
      return result
    },

    /**
     * @description: 登出
     */
    async logout() {
      this.setPermissions([])
      this.setInfo({ name: "", email: "" })
      this.setToken("")
      localStorage.removeItem("token")
    },
  },
})

export function useUser() {
  return useUserStore(store)
}
