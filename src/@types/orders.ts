import { z } from 'zod'

export const MoneySchema = z.object({
  amount: z.string(),
  currency_code: z.string(),
})

export const PriceSetSchema = z.object({
  shop_money: MoneySchema,
  presentment_money: MoneySchema,
})

export const DiscountAllocationSchema = z.object({
  amount: z.string(),
  amount_set: z.object({
    shop_money: MoneySchema,
    presentment_money: MoneySchema,
  }),
  discount_application_index: z.number(),
})

export const ShopifyLineItemSchema = z.object({
  id: z.number(),
  sku: z.string().nullable(),
  name: z.string(),
  grams: z.number(),
  price: z.string(),
  title: z.string(),
  duties: z.array(z.any()),
  vendor: z.string(),
  taxable: z.boolean(),
  quantity: z.number(),
  gift_card: z.boolean(),
  price_set: PriceSetSchema,
  tax_lines: z.array(z.any()),
  product_id: z.number(),
  properties: z.array(z.any()),
  variant_id: z.number(),
  variant_title: z.string(),
  product_exists: z.boolean(),
  total_discount: z.string(),
  current_quantity: z.number(),
  attributed_staffs: z.array(z.any()),
  requires_shipping: z.boolean(),
  fulfillment_status: z.string().nullable(),
  total_discount_set: PriceSetSchema,
  fulfillment_service: z.string(),
  admin_graphql_api_id: z.string(),
  discount_allocations: z.array(DiscountAllocationSchema),
  fulfillable_quantity: z.number(),
  sales_line_item_group_id: z.string().nullable(),
  variant_inventory_management: z.string(),
})

export const DiscountCodeSchema = z.object({
  code: z.string(),
  type: z.string(),
  amount: z.string(),
})

export const OrderSchema = z.object({
  id: z.number().int(),
  order_id: z.number().int().nullable(),
  order_name: z.string().nullable(),
  currency: z.string().nullable(),
  total_price: z.string().nullable(),
  total_discounts: z.string().nullable(),
  discount_codes: z.array(DiscountCodeSchema).nullable(),
  customer_id: z.number().int().nullable(),
  customer_first_name: z.string().nullable(),
  customer_last_name: z.string().nullable(),
  customer_email: z.string().nullable(),
  shipping_first_name: z.string().nullable(),
  shipping_last_name: z.string().nullable(),
  shipping_country_code: z.string().nullable(),
  shipping_address1: z.string().nullable(),
  shipping_address2: z.string().nullable(),
  shipping_zip: z.string().nullable(),
  shipping_phone: z.string().nullable(),
  line_items: z.array(ShopifyLineItemSchema),
  financial_status: z.string().nullable(),
  fulfillment_status: z.string().nullable(),
  created_at: z.string().datetime().nullable(),
  updated_at: z.string().datetime().nullable(),
  delivery_method: z.string().nullable(),
  delivery_date: z.string().datetime().nullable(),
  tracking_id: z.string().nullable(),
  pickup_date: z.string().datetime().nullable(),
})

export const GetOrdersResponseSchema = z.object({
  orders: z.array(OrderSchema),
})

export const FulfillOrderRequestSchema = z.object({
  order_id: z.number().int(),
})

export const FulfillOrderResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  ninjavan_tracking_number: z.string().nullable(),
  order_id: z.number().int(),
  shopify_fulfillment_created: z.boolean(),
  shopify_fulfillment_id: z.string().nullable(),
})

export const TransformedOrderSchema = z.object({
  orderId: z.number().int().nullable(),
  orderNumber: z.number(),
  orderName: z.string().nullable(),
  trackingId: z.string().nullable(),
  customerName: z.string(),
  customerEmail: z.string(),
  createdAt: z.string().datetime().nullable(),
  totalPrice: z.string(),
  deliveryDate: z.string().datetime().nullable(),
  fulfillmentStatus: z.string().nullable(),
  deliveryMethod: z.string().nullable(),
  status: z.string().nullable(),
  items: z.string(),
  discounts: z.string().nullable(),
  shippingDetails: z.string(),
  pickupDate: z.string().datetime().nullable(),
})

export const PrintTemplateDataSchema = z.object({
  delivery_date: z.string(),
  tracking_id: z.string(),
  order_id: z.string(),
  shipping_first_name: z.string(),
  shipping_last_name: z.string(),
  shipping_contact_number: z.string(),
  shipping_address1: z.string(),
  shipping_address2: z.string(),
  special_instructions: z.string(),
  pickup_date: z.string(),
  variant_1: z.string(),
  variant_2: z.string(),
  variant_3: z.string(),
  variant_4: z.string(),
  variant_5: z.string(),
  variant_6: z.string(),
})

export const PrintLabelRequestSchema = z.object({
  label_type: z.string(),
  template_data: PrintTemplateDataSchema,
})

export const UpdateOrderRequestSchema = z.object({
  order_id: z.number().int(),
  delivery_date: z.string().optional(),
  delivery_method: z.string().optional(),
  fulfillment_status: z.string().optional(),
})

export const UpdateOrderFormSchema = UpdateOrderRequestSchema.omit({
  order_id: true,
})

export type Order = z.infer<typeof OrderSchema>
export type ShopifyLineItem = z.infer<typeof ShopifyLineItemSchema>
export type DiscountCode = z.infer<typeof DiscountCodeSchema>
export type TransformedOrder = z.infer<typeof TransformedOrderSchema>
export type PrintTemplateData = z.infer<typeof PrintTemplateDataSchema>
export type GetOrdersResponse = z.infer<typeof GetOrdersResponseSchema>
export type FulfillOrderRequest = z.infer<typeof FulfillOrderRequestSchema>
export type FulfillOrderResponse = z.infer<typeof FulfillOrderResponseSchema>
export type PrintLabelRequest = z.infer<typeof PrintLabelRequestSchema>
export type UpdateOrderRequest = z.infer<typeof UpdateOrderRequestSchema>
export type UpdateOrderForm = z.infer<typeof UpdateOrderFormSchema>
