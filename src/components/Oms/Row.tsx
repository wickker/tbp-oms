import { PropsWithChildren } from 'react'
import { TransformedOrder } from '@/@types/orders'
import { Button } from '@/components/commons'
import { cn } from '@/lib/utils'

type ContentProps = {
  className?: string
} & PropsWithChildren

const Content = ({ children, className }: ContentProps) => {
  return (
    <div className={cn('p-3 text-sm break-words', className)}>{children}</div>
  )
}

const Row = ({ order }: { order: TransformedOrder }) => {
  return (
    <>
      <Content>{order.orderName}</Content>
      <Content>{order.trackingId}</Content>
      <Content>{order.customerName}</Content>
      <Content>{order.createdAt}</Content>
      <Content>{order.totalPrice}</Content>
      <Content className='font-semibold whitespace-pre-line'>
        {order.items}
      </Content>
      <Content className='text-xs whitespace-pre-line'>
        {order.discounts}
      </Content>
      <Content>{order.deliveryDate}</Content>
      <Content>{order.fulfilmentStatus}</Content>
      <Content>{order.deliveryMethod}</Content>
      <Content>
        <Button>Fulfill</Button>
      </Content>

      <div className='col-span-full border-b border-neutral-200' />
    </>
  )
}

export default Row
