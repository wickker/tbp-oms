import { PropsWithChildren } from 'react'
import { TransformedOrder } from '@/@types/orders'
import { Button } from '@/components/commons'
import { cn } from '@/lib/utils'
import { DeliveryMethod, FulfillmemtStatus } from '@/utils/enums'

type ContentProps = {
  className?: string
} & PropsWithChildren

const Content = ({ children, className }: ContentProps) => {
  return (
    <div className={cn('p-3 text-sm break-words', className)}>{children}</div>
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
  onClickNvTid: () => void
}

const Row = ({ order, onClickNvTid }: RowProps) => {
  const isFulfilled = order.fulfilmentStatus === FulfillmemtStatus.FULFILLED

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
      </Content>
      <Content className='text-xs'>
        <button
          className='text-left break-all text-blue-500 underline'
          onClick={onClickNvTid}
        >
          {order.trackingId}
        </button>
      </Content>
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
      <Content className='text-xs font-semibold'>{order.deliveryDate}</Content>
      <Content>
        {isFulfilled ? (
          <Chip className='bg-[#D8FADB] text-green-600'>
            {FulfillmemtStatus.FULFILLED}
          </Chip>
        ) : (
          <Chip className='bg-[#FBDED7] text-red-500'>
            {FulfillmemtStatus.UNFULFILLED}
          </Chip>
        )}
      </Content>
      <Content>
        {order.deliveryMethod === DeliveryMethod.NV_COLD_CHAIN ? (
          <Chip className='bg-[#DBDDFF] text-blue-600'>NV COLD CHAIN</Chip>
        ) : (
          <Chip className='bg-zinc-300 text-zinc-600'>SELF PICKUP</Chip>
        )}
      </Content>
      <Content className='text-xs whitespace-pre-line'>
        {order.shippingDetails}
      </Content>
      <Content className='text-xs'>{order.createdAt}</Content>
      <Content>
        {!isFulfilled ? (
          <Button size='sm'>Fulfill</Button>
        ) : (
          <Button size='sm' variant='outline'>
            Print Label
          </Button>
        )}
      </Content>

      <div className='col-span-full border-b border-neutral-200' />
    </>
  )
}

export default Row
