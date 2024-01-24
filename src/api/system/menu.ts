import service from "@/utils/http/axios"

export function adminMenus() {
  return service.get("/admin/menus")
}
