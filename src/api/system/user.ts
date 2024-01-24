import service from "@/utils/http/axios"

export function login(params: any) {
  return service.post("http://127.0.0.1:8081/login", params)
}

export function getUserInfo(params: any) {
  return service.get("http://127.0.0.1:8081/user/info", { params })
}
