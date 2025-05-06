import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { DateTime } from 'luxon'
import { GetNvOrdersResponse } from '@/@types/nvOrders'
import { TransformedOrder } from '@/@types/orders'
import api from '@/services/api'
import {
  convertDbTimestampToDisplayDate,
  parseDiscountsToDisplayString,
  parseLineItemsToDisplayString,
  parseOrderNameToNumber,
  parseShippingAddressToDisplayString,
} from '@/utils/functions'

const getNvOrder = async ({
  trackingId,
  token,
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

const useOrder = () => {
  const useGetOrdersQuery = () =>
    useQuery({
      queryKey: ['orders'],
      queryFn: api.getOrders,
      select: (data): Array<TransformedOrder> =>
        data.orders.map((order) => {
          return {
            orderId: order.order_id,
            orderNumber: parseOrderNameToNumber(order.order_name),
            orderName: order.order_name,
            trackingId: order.tracking_id,
            customerName: `${order.customer_first_name || ''} ${order.customer_last_name || ''}`,
            customerEmail: order.customer_email || '',
            createdAt: convertDbTimestampToDisplayDate(order.created_at),
            totalPrice: `${order.total_price}`,
            deliveryDate: convertDbTimestampToDisplayDate(order.delivery_date),
            fulfilmentStatus: order.fulfilment_status,
            deliveryMethod: order.delivery_method,
            status: order.financial_status,
            items: parseLineItemsToDisplayString(order.line_items),
            discounts: parseDiscountsToDisplayString(order.discount_codes),
            shippingDetails: `${order.shipping_first_name || ''} ${order.shipping_last_name || ''}\n${order.shipping_phone || ''}\n${parseShippingAddressToDisplayString(order)}`,
          }
        }),
    })

  const useGetNvOrderMutation = (
    onSuccess?: (data: GetNvOrdersResponse) => void
  ) =>
    useMutation({
      mutationFn: getNvOrder,
      onSuccess,
    })

  return {
    useGetOrdersQuery,
    useGetNvOrderMutation,
  }
}

export default useOrder
