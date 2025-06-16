import { z } from 'zod'

export const GetCustomersRequestSchema = z.object({
  email: z.string().optional(),
  name: z.string().optional(),
  limit: z.number().int().min(1).max(1000).default(25).optional(),
  offset: z.number().int().min(0).default(0).optional(),
})

const CustomerSchema = z.object({
  id: z.number(),
  first_name: z.string().nullable(),
  last_name: z.string().nullable(),
  email: z.string().nullable(),
  contact: z.string().nullable(),
  subscription: z.record(z.unknown()).nullable(),
  created_at: z.string().datetime().nullable(),
  updated_at: z.string().datetime().nullable(),
})

export const GetCustomersResponseSchema = z.object({
  customers: z.array(CustomerSchema),
  total: z.number(),
  limit: z.number(),
  offset: z.number(),
})

export type GetCustomersRequest = z.infer<typeof GetCustomersRequestSchema>
export type GetCustomersResponse = z.infer<typeof GetCustomersResponseSchema>
