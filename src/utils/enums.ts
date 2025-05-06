export const FulfillmemtStatus = {
  FULFILLED: 'FULFILLED',
  UNFULFILLED: 'UNFULFILLED',
}

export type FulfillmentStatus =
  (typeof FulfillmemtStatus)[keyof typeof FulfillmemtStatus]

export const DeliveryMethod = {
  NV_COLD_CHAIN: 'NINJAVAN_COLD_CHAIN',
  SELF_COLLECTION: 'SELF_COLLECTION',
}

export type DeliveryMethod =
  (typeof DeliveryMethod)[keyof typeof DeliveryMethod]
