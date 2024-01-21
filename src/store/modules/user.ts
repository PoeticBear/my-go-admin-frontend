import { defineStore } from "pinia"
import { store } from "@/store"
import { storage } from "@/utils/Storage"
import { ACCESS_TOKEN, CURRENT_USER } from "../mutation-types"
import { login } from "@/api/system/user"
import { ResultEnum } from "@/enums/httpEnum"

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
    getInfo(): UserInfoType {
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
      const response = await login(params)
      console.log("response", response)
      const { code, data } = response as any
      const { token } = data
      if (code === ResultEnum.SUCCESS) {
        localStorage.setItem("token", token)
        // const ex = 7 * 24 * 60 * 60
        // storage.set(ACCESS_TOKEN, data.token, ex)
        // storage.set(CURRENT_USER, result, ex)
        this.setToken(token)
        // this.setInfo(result)
      }
      return response
    },
  },
})

export function useUser() {
  return useUserStore(store)
}
