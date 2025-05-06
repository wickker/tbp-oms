import { useMemo, useState, useCallback } from 'react'
import { GetNvOrdersResponse } from '@/@types/nvOrders'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import useOrder from '@/hooks/queries/useOrder'
import { cn } from '@/lib/utils'
import { FulfillmemtStatus } from '@/utils/enums'
import Row from './Row'
import RowsHeader from './RowsHeader'
import Skeleton from './Skeleton'

const colDimensions =
  'grid-cols-[80px_80px_120px_80px_minmax(200px,1fr)_100px_100px_120px_140px_120px_100px_140px]'

const Oms = () => {
  const [token, setToken] = useState('')
  const [status, setStatus] = useState('unfulfilled')
  const { useGetOrdersQuery, useGetNvOrderMutation } = useOrder()
  const getOrders = useGetOrdersQuery()
  const getNvOrder = useGetNvOrderMutation(handleGetNvOrderSuccess)

  const orders = useMemo(() => getOrders.data || [], [getOrders.data])
  const filteredOrders = useMemo(() => {
    if (status === 'fulfilled')
      return orders.filter(
        (order) => order.fulfilmentStatus === FulfillmemtStatus.FULFILLED
      )
    if (status === 'unfulfilled')
      return orders.filter(
        (order) => order.fulfilmentStatus === FulfillmemtStatus.UNFULFILLED
      )
    return orders
  }, [orders, status])
  const hasfilteredOrders = filteredOrders.length > 0 && !getOrders.isFetching

  function handleGetNvOrderSuccess(data: GetNvOrdersResponse) {
    if (data.total === 0) return
    const order = data.search_data[0].order
    if (order && order.id) {
      window.open(
        `https://dashboard.ninjavan.co/home/order/${order.id}`,
        '_blank'
      )
    }
  }

  const handleClickTrackingId = useCallback(
    (trackingId: string) => {
      if (!trackingId || !token) return
      getNvOrder.mutate({
        trackingId,
        token: token.trim(),
      })
    },
    [token, getNvOrder]
  )

  const ordersDisplay = useMemo(
    () =>
      filteredOrders.map((order) => (
        <Row
          key={order.orderName}
          order={order}
          onClickNvTid={() => handleClickTrackingId(order.trackingId || '')}
        />
      )),
    [handleClickTrackingId, filteredOrders]
  )

  const renderOrders = () => {
    if (getOrders.isFetching) {
      return <Skeleton />
    }

    if (!hasfilteredOrders) {
      return <div className='col-span-full mx-auto py-5'>No orders found</div>
    }

    return ordersDisplay
  }

  return (
    <div className='min-h-[100dvh] min-w-max overflow-y-hidden'>
      <div className='mx-auto flex max-w-[1450px] flex-col p-3'>
        <div className='flex items-center justify-between gap-x-2 pb-3'>
          <div className='flex flex-col gap-y-1'>
            <label className='text-xs font-semibold text-neutral-500'>
              Status
            </label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className='w-[130px]'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>All</SelectItem>
                <SelectItem value='fulfilled'>Fulfilled</SelectItem>
                <SelectItem value='unfulfilled'>Unfulfilled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className='flex flex-col gap-y-1'>
            <label className='text-xs font-semibold text-neutral-500'>
              Dash Bearer Token
            </label>
            <Input
              type='text'
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className='w-[250px] text-xs'
            />
          </div>
        </div>

        <RowsHeader className={colDimensions} />

        <div
          className={cn(
            'scrollbar grid max-h-[calc(100vh-68px-12px-12px-65px)] w-full items-center overflow-x-hidden overflow-y-auto text-sm',
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
