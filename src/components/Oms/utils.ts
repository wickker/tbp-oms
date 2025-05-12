import { QueryClient } from '@tanstack/react-query'
import {
  GetOrdersResponse,
  PrintTemplateData,
  TransformedOrder,
} from '@/@types/orders'
import { DeliveryMethod, FulfillmemtStatus } from '@/utils/enums'
import { convertDbTimestampToPrintDate } from '@/utils/functions'

export const getPrintTemplate = (
  queryClient: QueryClient,
  orderId: number
): PrintTemplateData | undefined => {
  const orders: GetOrdersResponse | undefined = queryClient.getQueryData([
    'orders',
  ])
  if (!orders) return
  const orderFound = orders.orders.find((o) => o.order_id === orderId)
  if (!orderFound) return

  const template: PrintTemplateData = {
    delivery_date: convertDbTimestampToPrintDate(orderFound.delivery_date),
    tracking_id: orderFound.tracking_id || '',
    order_id: orderFound.order_id?.toString() || '',
    shipping_first_name: orderFound.shipping_first_name || '',
    shipping_last_name: orderFound.shipping_last_name || '',
    shipping_contact_number: orderFound.shipping_phone || '',
    shipping_address1: orderFound.shipping_address1 || '',
    shipping_address2: orderFound.shipping_address2 || '',
    pickup_date: convertDbTimestampToPrintDate(orderFound.pickup_date) || '',
    special_instructions: '', // TODO: Ask Shaun
    variant_1: '',
    variant_2: '',
    variant_3: '',
    variant_4: '',
    variant_5: '',
    variant_6: '',
  }

  let count = orderFound.line_items.length
  if (count > 6) count = 6

  for (let i = 0; i < count; i++) {
    const variantKey = `variant_${i + 1}`
    const item = orderFound.line_items[i]
    template[variantKey as keyof PrintTemplateData] =
      `${item.quantity} x ${item.name}`
  }
  return template
}

export const applyFiltersAndSort = (
  orders: Array<TransformedOrder>,
  status: string,
  deliveryMethod: string,
  sortBy: string,
  searchPhrase: string
): Array<TransformedOrder> => {
  let filteredOrders = orders

  // filters
  if (status === 'fulfilled')
    filteredOrders = filteredOrders.filter(
      (order) => order.fulfillmentStatus === FulfillmemtStatus.FULFILLED
    )
  if (status === 'unfulfilled')
    filteredOrders = filteredOrders.filter(
      (order) => order.fulfillmentStatus === FulfillmemtStatus.UNFULFILLED
    )
  if (deliveryMethod === 'ninja_cold')
    filteredOrders = filteredOrders.filter(
      (order) => order.deliveryMethod === DeliveryMethod.NV_COLD_CHAIN
    )
  if (deliveryMethod === 'self_pickup')
    filteredOrders = filteredOrders.filter(
      (order) => order.deliveryMethod === DeliveryMethod.SELF_COLLECTION
    )

  // search
  if (searchPhrase) {
    filteredOrders = filteredOrders.filter(
      (order) =>
        order.orderName?.includes(searchPhrase) ||
        order.trackingId?.toLowerCase().includes(searchPhrase.toLowerCase()) ||
        order.customerName
          ?.toLowerCase()
          .includes(searchPhrase.toLowerCase()) ||
        order.customerEmail?.toLowerCase().includes(searchPhrase.toLowerCase())
    )
  }

  // sorts
  if (sortBy === 'order_id_desc') {
    filteredOrders = filteredOrders.sort(
      (a, b) => b.orderNumber - a.orderNumber
    )
  }
  if (sortBy === 'order_id_asc') {
    filteredOrders = filteredOrders.sort(
      (a, b) => a.orderNumber - b.orderNumber
    )
  }
  if (sortBy === 'delivery_date_asc') {
    filteredOrders = filteredOrders.sort((a, b) => {
      if (!a.deliveryDate) return -1
      if (!b.deliveryDate) return 1
      return (
        new Date(a.deliveryDate).getTime() - new Date(b.deliveryDate).getTime()
      )
    })
  }
  if (sortBy === 'delivery_date_desc') {
    filteredOrders = filteredOrders.sort((a, b) => {
      if (!a.deliveryDate) return 1
      if (!b.deliveryDate) return -1
      return (
        new Date(b.deliveryDate).getTime() - new Date(a.deliveryDate).getTime()
      )
    })
  }
  return filteredOrders
}
