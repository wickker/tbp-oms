import axios from 'axios'
import { GetOrdersResponse } from '@/@types/orders'
import Config from '@/configs'

const api = axios.create({
  baseURL: `${Config.VITE_BASE_URL}/wms`,
  headers: {
    'Content-Type': 'application/json',
  },
})

// GET
const getOrders = (): Promise<GetOrdersResponse> =>
  api.get('/orders', { params: { limit: 1000 } }).then((res) => res.data)

export default {
  getOrders,
}
