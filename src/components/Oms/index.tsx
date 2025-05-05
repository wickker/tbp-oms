import useOrder from '@/hooks/queries/useOrder'
import Row from './Row'
import RowsHeader from './RowsHeader'

const Oms = () => {
  const { useGetOrdersQuery } = useOrder()
  const getOrders = useGetOrdersQuery()

  return (
    <div className='min-h-[100dvh] min-w-max overflow-y-hidden'>
      <div className='mx-auto flex max-w-[1400px] flex-col p-3'>
        <div className='flex h-[38px] gap-x-2 pb-3'></div>

        <RowsHeader />

        <div className='scrollbar grid max-h-[calc(100vh-38px-12px-12px-64px)] w-full grid-cols-[90px_120px_120px_100px_minmax(200px,1fr)_120px_100px_120px_120px_120px_150px] items-center overflow-x-hidden overflow-y-auto text-sm'>
          {getOrders.data?.map((order) => (
            <Row key={order.orderName} order={order} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Oms
