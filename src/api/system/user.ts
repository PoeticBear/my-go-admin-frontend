import service from "@/utils/http/axios"

export interface BasicResponseModel<T = any> {
  code: number
  data: T
  message: string
}

export interface BasicPageParams {
  page: number
  pageSize: number
  total?: number
}

export function login(params: any) {
  return service.post("http://127.0.0.1:8081/login", params)
}

export function getUserInfo() {
  return service.get("/user/info")
}

export function logout() {
  return service.post("/logout")
}
