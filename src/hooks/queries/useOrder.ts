import { useMutation, useQuery } from '@tanstack/react-query'
import { GetNvOrdersResponse } from '@/@types/nvOrders'
import {
  FulfillOrderResponse,
  TransformedOrder,
  UpdateOrderRequest,
  UpdateOrderResponse,
} from '@/@types/orders'
import useAxiosConfig from '@/hooks/useAxiosConfig'
import api from '@/services/api'
import {
  convertDbTimestampToDisplayDate,
  parseDiscountsToDisplayString,
  parseLineItemsToDisplayString,
  parseOrderNameToNumber,
  parseShippingAddressToDisplayString,
} from '@/utils/functions'

const useOrder = () => {
  const { initConfig } = useAxiosConfig()

  const useGetOrdersQuery = () =>
    useQuery({
      queryKey: ['orders'],
      queryFn: api.getOrders(initConfig({ limit: 1000 })),
      retry: false,
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
            pickupDate: convertDbTimestampToDisplayDate(order.pickup_date),
            fulfillmentStatus: order.fulfillment_status,
            deliveryMethod: order.delivery_method,
            paymentStatus: order.payment_status,
            items: parseLineItemsToDisplayString(order.line_items),
            discounts: parseDiscountsToDisplayString(order.discount_codes),
            shippingDetails: `${order.shipping_first_name || ''} ${order.shipping_last_name || ''}\n${order.shipping_phone || ''}\n${parseShippingAddressToDisplayString(order)}`,
          }
        }),
    })

  const useGetNvOrderMutation = (
    onSuccess: (data: GetNvOrdersResponse) => void
  ) =>
    useMutation({
      mutationFn: api.getNvOrder,
      retry: false,
      onSuccess,
    })

  const useFulfillOrderMutation = (
    onSuccess: (data: FulfillOrderResponse) => void
  ) =>
    useMutation({
      mutationFn: api.fulfillOrder(initConfig()),
      retry: false,
      onSuccess,
    })

  const usePrintOrderMutation = (onSuccess?: () => void) =>
    useMutation({
      mutationFn: api.printLabel,
      retry: false,
      onSuccess,
    })

  const useCancelOrderMutation = (onSuccess?: () => void) =>
    useMutation({
      mutationFn: api.cancelOrder(initConfig()),
      retry: false,
      onSuccess,
    })

  const useUpdateOrderMutation = (
    onSuccess?: (
      data: UpdateOrderResponse,
      variables: UpdateOrderRequest
    ) => void
  ) =>
    useMutation({
      mutationFn: api.updateOrder(initConfig()),
      retry: false,
      onSuccess,
    })

  const useUnfulfillOrderMutation = (
    onSuccess?: (
      data: UpdateOrderResponse,
      variables: UpdateOrderRequest
    ) => void
  ) =>
    useMutation({
      mutationFn: api.updateOrder(initConfig()),
      retry: false,
      onSuccess,
    })

  return {
    useGetOrdersQuery,
    useGetNvOrderMutation,
    useFulfillOrderMutation,
    usePrintOrderMutation,
    useCancelOrderMutation,
    useUpdateOrderMutation,
    useUnfulfillOrderMutation,
  }
}

export default useOrder
