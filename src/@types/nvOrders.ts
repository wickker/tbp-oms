import { z } from 'zod'

export const NvOrderSchema = z.object({
  id: z.number(),
  tracking_id: z.string(),
  from_name: z.string(),
  from_contact: z.string(),
  from_address1: z.string(),
  from_postcode: z.string(),
  to_name: z.string(),
  to_contact: z.string(),
  to_address1: z.string(),
  to_address2: z.string().optional(),
  to_postcode: z.string(),
  granular_status: z.string(),
  created_at: z.string(),
  status: z.string(),
  shipper_id: z.number(),
  type: z.string(),
  bulk_id: z.number(),
  bulk_sequence_number: z.number(),
  sort_code: z.string(),
  parent_shipper_id: z.number(),
  cod_currency_source: z.string(),
  shipper_name: z.string(),
  is_restricted: z.boolean(),
})

export const SearchDataItemSchema = z.object({
  order: NvOrderSchema,
})

export const GetNvOrdersResponseSchema = z.object({
  total: z.number(),
  search_data: z.array(SearchDataItemSchema),
})

export type NvOrder = z.infer<typeof NvOrderSchema>
export type SearchDataItem = z.infer<typeof SearchDataItemSchema>
export type GetNvOrdersResponse = z.infer<typeof GetNvOrdersResponseSchema>
