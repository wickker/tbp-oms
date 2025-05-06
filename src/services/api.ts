import axios, { AxiosRequestConfig } from 'axios'
import { GetOrdersResponse } from '@/@types/orders'
import Config from '@/configs'

const api = axios.create({
  baseURL: `${Config.VITE_BASE_URL}/wms`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

// GET
const getOrders =
  (config: Promise<AxiosRequestConfig>) =>
  async (): Promise<GetOrdersResponse> =>
    api.get('/orders', await config).then((res) => res.data)

export default {
  getOrders,
}
