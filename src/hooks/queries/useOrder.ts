import { useQuery } from '@tanstack/react-query'
import { TransformedOrder } from '@/@types/orders'
import api from '@/services/api'
import {
  convertDbTimestampToDisplayDate,
  parseDiscountsToDisplayString,
  parseLineItemsToDisplayString,
  parseOrderNameToNumber,
  parseShippingAddressToDisplayString,
} from '@/utils/functions'

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
            totalPrice: `${order.currency} ${order.total_price}`,
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

  return {
    useGetOrdersQuery,
  }
}

export default useOrder
