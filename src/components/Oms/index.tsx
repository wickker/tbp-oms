import { useState } from 'react'
import useOrder from '@/hooks/queries/useOrder'
import { cn } from '@/lib/utils'
import Row from './Row'
import RowsHeader from './RowsHeader'
import Skeleton from './Skeleton'

const colDimensions =
  'grid-cols-[80px_80px_120px_80px_minmax(200px,1fr)_100px_100px_120px_140px_120px_100px_140px]'

const Oms = () => {
  const [token, setToken] = useState('')
  const { useGetOrdersQuery } = useOrder()
  const getOrders = useGetOrdersQuery()
  const orders = getOrders.data || []
  const hasOrders = orders.length > 0 && !getOrders.isFetching

  const renderOrders = () => {
    if (getOrders.isFetching) {
      return <Skeleton />
    }

    if (!hasOrders) {
      return <div className='col-span-full mx-auto py-5'>No orders yet</div>
    }

    return orders.map((order) => (
      <Row key={order.orderName} order={order} token={token} />
    ))
  }

  return (
    <div className='min-h-[100dvh] min-w-max overflow-y-hidden'>
      <div className='mx-auto flex max-w-[1450px] flex-col p-3'>
        <div className='flex h-[38px] gap-x-2 pb-3'>
          <input
            type='text'
            placeholder='Input Dash token'
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
        </div>

        <RowsHeader className={colDimensions} />

        <div
          className={cn(
            'scrollbar grid max-h-[calc(100vh-38px-12px-12px-64px)] w-full items-center overflow-x-hidden overflow-y-auto text-sm',
            colDimensions
          )}
        >
          {renderOrders()}
        </div>
      </div>
    </div>
  )
}

export default Oms
