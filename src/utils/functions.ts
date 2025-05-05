import { DateTime } from 'luxon'
import { DiscountCode, ShopifyLineItem } from '@/@types/orders'

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
