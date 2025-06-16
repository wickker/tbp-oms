import { memo, PropsWithChildren } from 'react'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { motion } from 'motion/react'
import {
  CancelOrderResponse,
  FulfillOrderResponse,
  GetOrdersResponse,
  Order,
  TransformedOrder,
  UpdateOrderRequest,
  UpdateOrderResponse,
} from '@/@types/orders'
import { Button } from '@/components/commons'
import useOrder from '@/hooks/queries/useOrder'
import { DeliveryMethod, FulfillmemtStatus } from '@/utils/enums'
import { cn } from '@/utils/functions'
import EditOrderModal from './EditOrderModal'
import { getPrintTemplate } from './utils'

type ContentProps = {
  className?: string
} & PropsWithChildren

const Content = ({ children, className }: ContentProps) => {
  return (
    <motion.div
      className={cn('p-3 text-sm break-words', className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {children}
    </motion.div>
  )
}

type ChipProps = {
  className?: string
} & PropsWithChildren

const Chip = ({ children, className }: ChipProps) => {
  return (
    <div
      className={cn(
        'inline-flex h-fit w-fit items-center justify-center gap-x-2 rounded-md px-2 py-1 text-xs whitespace-nowrap',
        className
      )}
    >
      {children}
    </div>
  )
}

type RowProps = {
  order: TransformedOrder
  onClickNvTid?: () => void
}

const Row = memo(({ order, onClickNvTid }: RowProps) => {
  const queryClient = useQueryClient()
  const {
    useFulfillOrderMutation,
    usePrintOrderMutation,
    useCancelNvOrderMutation,
    useUnfulfillOrderMutation,
    useCancelOrderMutation,
  } = useOrder()
  const fulfillOrder = useFulfillOrderMutation(handleFulfillOrderSuccess)
  const printOrder = usePrintOrderMutation(handlePrintOrderSuccess)
  const cancelNvOrder = useCancelNvOrderMutation(handleCancelNvOrderSuccess)
  const cancelOrder = useCancelOrderMutation(handleCancelOrderSuccess)
  const unfulfillOrder = useUnfulfillOrderMutation(handleUnfulfillOrderSuccess)
  const isFulfilled = order.fulfillmentStatus === FulfillmemtStatus.FULFILLED

  function handleCancelOrderSuccess(data: CancelOrderResponse) {
    if (data.success) {
      toast.success(data.message)
      queryClient.setQueryData(['orders'], (old: GetOrdersResponse) => {
        return {
          ...old,
          orders: old.orders.filter((o) => o.id !== order.internalOrderId),
        }
      })
    }
  }

  function handleUnfulfillOrderSuccess(
    _: UpdateOrderResponse,
    variables: UpdateOrderRequest
  ) {
    queryClient.setQueryData(['orders'], (old: GetOrdersResponse) => {
      return {
        ...old,
        orders: old.orders.map((order) =>
          order.id === variables.order_id
            ? ({
                ...order,
                fulfillment_status: FulfillmemtStatus.UNFULFILLED,
              } satisfies Order)
            : order
        ),
      }
    })
  }

  function handlePrintOrderSuccess() {
    toast.success(`Printed label for order ${order.orderName}`)
  }

  function handleCancelNvOrderSuccess() {
    toast.success(`Cancelled NV order ${order.orderName}`)
  }

  function handleFulfillOrderSuccess(data: FulfillOrderResponse) {
    if (data.success) {
      toast.success(data.message)
      queryClient.setQueryData(['orders'], (old: GetOrdersResponse) => {
        return {
          ...old,
          orders: old.orders.map((order) =>
            order.order_id === data.order_id
              ? ({
                  ...order,
                  fulfillment_status: FulfillmemtStatus.FULFILLED,
                  tracking_id: data.ninjavan_tracking_number,
                } satisfies Order)
              : order
          ),
        }
      })
      handlePrintOrder()
      return
    }

    toast.error(data.message)
  }

  const handlePrintOrder = () => {
    if (!order.orderId) return
    const template = getPrintTemplate(queryClient, order.orderId)
    if (!template) return
    printOrder.mutate({
      label_type: order.deliveryMethod || '',
      template_data: template,
    })
  }

  const handleCancelOrder = () => cancelOrder.mutate(order.internalOrderId)

  const handleFulfillOrder = () => fulfillOrder.mutate(order.internalOrderId)

  const handleCancelNvOrder = () => cancelNvOrder.mutate(order.internalOrderId)

  const handleUnfulfillOrder = () =>
    unfulfillOrder.mutate({
      order_id: order.internalOrderId,
      fulfillment_status: FulfillmemtStatus.UNFULFILLED,
    })

  return (
    <>
      <Content>
        <a
          href={`https://admin.shopify.com/store/d2ac44-d5/orders/${order.orderId}`}
          target='_blank'
          className='text-blue-500 underline'
        >
          {order.orderName}
        </a>

        <br />
        <br />
        <div className='text-xs'>
          Internal Order ID: {order.internalOrderId}
        </div>
      </Content>

      {onClickNvTid && (
        <Content className='text-xs'>
          <button
            className='text-left break-all text-blue-500 underline'
            onClick={onClickNvTid}
          >
            {order.trackingId}
          </button>
        </Content>
      )}

      <Content className='whitespace-pre-line'>
        {order.customerName}
        <br />
        <div className='text-xs whitespace-pre-line text-neutral-500'>
          {order.customerEmail}
        </div>
      </Content>

      <Content>{order.totalPrice}</Content>

      <Content className='font-semibold whitespace-pre-line'>
        {order.items}
      </Content>

      <Content className='text-xs whitespace-pre-line'>
        {order.discounts}
      </Content>

      <Content className='text-xs'>
        <div>
          Delivery Date:{' '}
          <span className='font-semibold'>{order.deliveryDate}</span>
        </div>
        <br />
        <div>
          Pickup Date: <span className='font-semibold'>{order.pickupDate}</span>
        </div>
      </Content>

      <Content>
        {order.fulfillmentStatus === FulfillmemtStatus.FULFILLED && (
          <Chip className='bg-[#D8FADB] text-green-600'>
            {FulfillmemtStatus.FULFILLED}
          </Chip>
        )}
        {order.fulfillmentStatus === FulfillmemtStatus.UNFULFILLED && (
          <Chip className='bg-[#FBDED7] text-red-500'>
            {FulfillmemtStatus.UNFULFILLED}
          </Chip>
        )}
      </Content>

      <Content>
        {order.deliveryMethod === DeliveryMethod.NV_COLD_CHAIN && (
          <Chip className='bg-[#DBDDFF] text-blue-600'>NV COLD CHAIN</Chip>
        )}
        {order.deliveryMethod === DeliveryMethod.SELF_COLLECTION && (
          <Chip className='bg-zinc-300 text-zinc-600'>SELF PICKUP</Chip>
        )}
      </Content>

      <Content className='text-xs whitespace-pre-line'>
        {order.shippingDetails}
      </Content>

      <Content className='text-xs'>{order.createdAt}</Content>

      <Content>
        <EditOrderModal
          internalOrderId={order.internalOrderId}
          deliveryDate={order.deliveryDate || ''}
          deliveryMethod={order.deliveryMethod || ''}
        />

        <Button
          size='sm'
          variant='outline'
          onClick={handleCancelOrder}
          isLoading={cancelOrder.isPending}
        >
          Cancel Order
        </Button>
        <div className='mb-2' />

        {!isFulfilled ? (
          <Button
            size='sm'
            onClick={handleFulfillOrder}
            isLoading={fulfillOrder.isPending}
          >
            Fulfill
          </Button>
        ) : (
          <>
            <Button
              size='sm'
              variant='outline'
              onClick={handlePrintOrder}
              isLoading={printOrder.isPending}
            >
              Print Label
            </Button>
            <div className='mb-2' />
            <Button
              size='sm'
              variant='outline'
              onClick={handleCancelNvOrder}
              isLoading={cancelNvOrder.isPending}
            >
              Cancel NV Order
            </Button>
            <div className='mb-2' />
            <Button
              size='sm'
              variant='outline'
              onClick={handleUnfulfillOrder}
              isLoading={unfulfillOrder.isPending}
            >
              Unfulfill
            </Button>
          </>
        )}
      </Content>

      <motion.div
        className='col-span-full border-b border-neutral-200'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />
    </>
  )
})

export default Row
