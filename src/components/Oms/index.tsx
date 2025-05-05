import { PropsWithChildren } from 'react'
import { Button } from '@/components/commons'
import { cn } from '@/lib/utils'
import RowsHeader from './RowsHeader'

// TODO: Change this
type Order = {
  orderId: string
  shopifyId: string
  customerName: string
  createdAt: string
  total: string
  items: string
  discounts: string
  deliveryDate: string
  contact: string
}

const order: Order = {
  orderId: '3289',
  shopifyId: '3924809834923804',
  customerName: 'Jeslyn Tan',
  createdAt: '19 Apr 2025',
  total: 'SGD 9.00',
  items: ' 1x Gently Cooked Free Range Beef for Cats - Trial Packs - Beef',
  discounts: 'FREETRIAL<3THEBONPET',
  deliveryDate: '20 Apr 2025',
  contact: '91234567',
}

const orders: Array<Order> = [
  order,
  order,
  order,
  order,
  order,
  order,
  order,
  order,
]

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
      <Content>{order.orderId}</Content>
      <Content>{order.shopifyId}</Content>
      <Content>{order.customerName}</Content>
      <Content>{order.createdAt}</Content>
      <Content>{order.total}</Content>
      <Content>{order.items}</Content>
      <Content>{order.discounts}</Content>
      <Content>{order.deliveryDate}</Content>
      <Content>{order.contact}</Content>
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

        <div className='scrollbar grid max-h-[calc(100vh-45px-12px-12px-38px)] grid-cols-[100px_120px_150px_100px_100px_minmax(200px,1fr)_120px_120px_120px_120px] items-center overflow-y-auto text-sm'>
          {orders.map((order, index) => (
            <Row key={index} order={order} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Oms
