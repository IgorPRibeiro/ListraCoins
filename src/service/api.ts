import axios, { AxiosResponse, AxiosRequestConfig, AxiosInstance, RawAxiosRequestHeaders } from 'axios'

const BASE_URL = 'http://10.0.2.2:3000'
const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
})

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
}

axiosInstance.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    config.headers = config.headers as RawAxiosRequestHeaders;
    return config;
  },
  (error) => Promise.reject(error),
)

const API = {
  get<T>(endpoint: string, params?: any): Promise<AxiosResponse<T>> {
    console.log("get")
    return axiosInstance.get<T>(endpoint, {
      params,
      headers: {
        ...DEFAULT_HEADERS,
      },
    })
  },

  post<T>(
    endpoint: string,
    payload?: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T | any>> {
    return axiosInstance.post(endpoint, payload, {
      headers: {
        ...DEFAULT_HEADERS,
        ...config?.headers,
      },
      ...config,
    })
  },



  all(requests: any[]): Promise<any[]> {
    return Promise.all(requests)
  },

}

export default API
