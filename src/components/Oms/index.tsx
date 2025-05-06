import useOrder from '@/hooks/queries/useOrder'
import { cn } from '@/lib/utils'
import Row from './Row'
import RowsHeader from './RowsHeader'
import Skeleton from './Skeleton'

const colDimensions =
  'grid-cols-[90px_120px_120px_100px_minmax(200px,1fr)_120px_100px_120px_120px_120px_150px]'

const Oms = () => {
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

    return orders.map((order) => <Row key={order.orderName} order={order} />)
  }

  return (
    <div className='min-h-[100dvh] min-w-max overflow-y-hidden'>
      <div className='mx-auto flex max-w-[1400px] flex-col p-3'>
        <div className='flex h-[38px] gap-x-2 pb-3'></div>

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
