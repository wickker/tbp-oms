import axios, { AxiosRequestConfig } from 'axios'
import { DateTime } from 'luxon'
import { GetNvOrdersResponse } from '@/@types/nvOrders'
import {
  CancelOrderResponse,
  FulfillOrderResponse,
  GetOrdersResponse,
  PrintLabelRequest,
  UpdateOrderRequest,
  UpdateOrderResponse,
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
const printLabel = (request: PrintLabelRequest): Promise<null> =>
  axios
    .post('http://localhost:8081/print', request, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res) => res.data)

const getNvOrder = async ({
  trackingId,
  token, // Dash token
}: {
  trackingId: string
  token: string
}): Promise<GetNvOrdersResponse> => {
  const url =
    'https://walrus.ninjavan.co/global/dash/1.0/orders/search?from=0&size=100&subshippers=true'
  const now = DateTime.now()
  const sixMonthsAgo = now.minus({ months: 6 })

  return axios
    .post(
      url,
      {
        required_fields: [],
        search_field: {
          fields: ['tracking_id', 'to_contact', 'to_name', 'mps_tracking_id'],
          match_type: 'full_text',
          value: trackingId,
        },
        search_filters: [],
        search_range: {
          start_time: sixMonthsAgo.toFormat(`yyyy-MM-dd'T'HH:mm:ss'Z'`),
          field: 'created_at',
          end_time: now.toFormat(`yyyy-MM-dd'T'HH:mm:ss'Z'`),
        },
      },
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'x-nv-shipper-id': '10773018',
        },
      }
    )
    .then((res) => res.data)
}

const fulfillOrder =
  (config: Promise<AxiosRequestConfig>) =>
  async (orderId: number): Promise<FulfillOrderResponse> =>
    api
      .post(`/orders/${orderId}/fulfill`, {}, await config)
      .then((res) => res.data)

// PATCH
const updateOrder =
  (config: Promise<AxiosRequestConfig>) =>
  async (request: UpdateOrderRequest): Promise<UpdateOrderResponse> =>
    api
      .patch(
        `/orders/${request.order_id}`,
        {
          delivery_date: request.delivery_date,
          delivery_method: request.delivery_method,
          fufillment_status: request.fulfillment_status,
        },
        await config
      )
      .then((res) => res.data)

// DELETE
const cancelNvOrder =
  (config: Promise<AxiosRequestConfig>) =>
  async (orderId: number): Promise<null> =>
    api
      .delete(`/orders/${orderId}/delivery`, await config)
      .then((res) => res.data)

const cancelOrder =
  (config: Promise<AxiosRequestConfig>) =>
  async (orderId: number): Promise<CancelOrderResponse> =>
    api
      .delete(`/orders/${orderId}/cancel`, await config)
      .then((res) => res.data)

export default {
  getNvOrder,
  getOrders,
  fulfillOrder,
  printLabel,
  cancelNvOrder,
  updateOrder,
  cancelOrder,
}
