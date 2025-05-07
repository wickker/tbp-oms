import axios, { AxiosRequestConfig } from 'axios'
import {
  FulfillOrderRequest,
  FulfillOrderResponse,
  GetOrdersResponse,
} from '@/@types/orders'
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

// POST
const fulfillOrder =
  (config: Promise<AxiosRequestConfig>) =>
  async (request: FulfillOrderRequest): Promise<FulfillOrderResponse> =>
    api.post('/fulfill-order', request, await config).then((res) => res.data)

export default {
  getOrders,
  fulfillOrder,
}
