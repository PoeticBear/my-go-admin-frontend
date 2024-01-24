export interface LoginParams {
  username: string
  password: string
}

export interface GetUserInfoParams {
  userId: number
}

export interface BasicResponseModel<T = any> {
  status: number
  data: T
  statusText: string
}

export interface BasicPageParams {
  page: number
  pageSize: number
  total?: number
}
