import { DateTime } from 'luxon'
import { DiscountCode, Order, ShopifyLineItem } from '@/@types/orders'

export const convertDbTimestampToDisplayDate = (dbTimestamp: string | null) => {
  if (!dbTimestamp) return ''
  const date = new Date(dbTimestamp)
  return DateTime.fromJSDate(date).toFormat('d MMM yyyy')
}

export const parseLineItemsToDisplayString = (
  lineItems: Array<ShopifyLineItem>
) => {
  return lineItems.map((item) => `${item.quantity} x ${item.name}`).join('\n\n')
}

export const parseDiscountsToDisplayString = (
  discounts: Array<DiscountCode> | null
) => {
  if (!discounts) return ''
  return discounts.map((discount) => discount.code).join('\n\n')
}

export const parseShippingAddressToDisplayString = (order: Order) => {
  let address = order.shipping_address1 || ''
  if (order.shipping_address2) {
    address += `\n${order.shipping_address2}`
  }
  // if (order.shipping_country_code) {
  //   address += `\n${order.shipping_country_code}`
  // }
  if (order.shipping_zip) {
    address += `\n${order.shipping_zip}`
  }
  return address
}
