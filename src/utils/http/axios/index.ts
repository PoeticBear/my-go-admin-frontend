import axios from "axios"

const service = axios.create({
  baseURL: process.env.VITE_BASE_API as string,
  timeout: 5000,
})

service.interceptors.request.use(
  (config: any) => {
    return config
  },
  error => {
    return Promise.reject(error)
  },
)

service.interceptors.response.use(
  (response: any) => {
    const res = response.data
    if (res.code !== 200) {
      return Promise.reject(new Error(res.message || "Error"))
    } else {
      return res
    }
  },
  error => {
    return Promise.reject(error)
  },
)

export function get(url: string, params?: any) {
  return service.get(url, {
    params,
  })
}

export function post(url: string, data?: any) {
  return service.post(url, data)
}

export default service
