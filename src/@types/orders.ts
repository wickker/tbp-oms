import { z } from 'zod'

export const OrderSchema = z.object({
  id: z.number().int(),
  order_id: z.number().int().nullable(),
  order_name: z.string().nullable(),
  currency: z.string().nullable(),
  total_price: z.string().nullable(),
  total_discounts: z.string().nullable(),
  discount_codes: z.string().nullable(), // json stringified
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
  line_items: z.string().nullable(), // json stringified
  financial_status: z.string().nullable(),
  fulfilment_status: z.string().nullable(),
  created_at: z.string().datetime().nullable(),
  updated_at: z.string().datetime().nullable(),
  delivery_method: z.string().nullable(),
  delivery_date: z.string().datetime().nullable(),
  tracking_id: z.string().nullable(),
})
