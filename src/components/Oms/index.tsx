import { PropsWithChildren } from 'react'
import { Order } from '@/@types/orders'
import { Button } from '@/components/commons'
import { cn } from '@/lib/utils'
import { mockOrders } from '@/mocks/orders'
import RowsHeader from './RowsHeader'
type ContentProps = {
  className?: string
} & PropsWithChildren

const Content = ({ children, className }: ContentProps) => {
  return (
    <div className={cn('p-3 text-sm break-words', className)}>{children}</div>
  )
}

const Row = ({ order }: { order: Order }) => {
  return (
    <>
      <Content>{order.order_name}</Content>
      <Content>{order.tracking_id}</Content>
      <Content>
        {order.customer_first_name} {order.customer_last_name}
      </Content>
      <Content>{order.created_at}</Content>
      <Content>
        {order.currency} {order.total_price}
      </Content>
      <Content></Content>
      <Content></Content>
      <Content>{order.delivery_date}</Content>
      <Content>{order.fulfilment_status}</Content>
      <Content>{order.delivery_method}</Content>
      <Content>
        <Button>Fulfill</Button>
      </Content>

      <div className='col-span-full border-b border-neutral-200' />
    </>
  )
}

const Oms = () => {
  return (
    <div className='min-h-[100dvh] min-w-max overflow-y-hidden'>
      <div className='mx-auto flex max-w-[1400px] flex-col p-3'>
        <div className='flex h-[38px] gap-x-2 pb-3'></div>

        <RowsHeader />

        <div className='scrollbar grid max-h-[calc(100vh-45px-12px-12px-38px)] grid-cols-[90px_120px_150px_100px_100px_minmax(200px,1fr)_120px_120px_120px_150px_120px] items-center overflow-x-hidden overflow-y-auto text-sm'>
          {mockOrders.map((order, index) => (
            <Row key={index} order={order} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Oms
