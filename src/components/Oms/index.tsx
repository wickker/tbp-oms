import {
  useMemo,
  useState,
  useCallback,
  useTransition,
  useDeferredValue,
} from 'react'
import { AnimatePresence } from 'motion/react'
import { useDebounce } from 'use-debounce'
import { GetNvOrdersResponse } from '@/@types/nvOrders'
import useOrder from '@/hooks/queries/useOrder'
import { cn } from '@/utils/functions'
import OptionsHeader from './OptionsHeader'
import Row from './Row'
import RowsHeader from './RowsHeader'
import Skeleton from './Skeleton'
import { applyFiltersAndSort } from './utils'

const Oms = () => {
  const [token, setToken] = useState('')
  const [status, setStatus] = useState('unfulfilled')
  const [deliveryMethod, setDeliveryMethod] = useState('all')
  const [sortBy, setSortBy] = useState('order_id_desc')
  const [searchPhrase, setSearchPhrase] = useState('')
  const { useGetOrdersQuery, useGetNvOrderMutation } = useOrder()
  const [isStatusChangePending, startStatusChangeTransition] = useTransition()
  const [isSortByChangePending, startSortByChangeTransition] = useTransition()
  const [isDeliveryMethodChangePending, startDeliveryMethodChangeTransition] =
    useTransition()
  const [debouncedSearchPhrase] = useDebounce(searchPhrase, 500)
  const deferredSearchPhrase = useDeferredValue(debouncedSearchPhrase)
  const getOrders = useGetOrdersQuery()
  const getNvOrder = useGetNvOrderMutation(handleGetNvOrderSuccess)

  // derived state
  const showTid = status !== 'unfulfilled'
  const colDimensions = showTid
    ? 'grid-cols-[80px_80px_120px_80px_minmax(200px,1fr)_100px_100px_120px_140px_120px_100px_140px]'
    : 'grid-cols-[80px_120px_80px_minmax(200px,1fr)_100px_100px_120px_140px_120px_100px_140px]'
  const orders = useMemo(() => getOrders.data || [], [getOrders.data])
  const filteredOrders = useMemo(
    () =>
      applyFiltersAndSort(
        orders,
        status,
        deliveryMethod,
        sortBy,
        deferredSearchPhrase.trim()
      ),
    [orders, status, deliveryMethod, sortBy, deferredSearchPhrase]
  )
  const hasfilteredOrders =
    filteredOrders.length > 0 &&
    !getOrders.isFetching &&
    !isStatusChangePending &&
    !isDeliveryMethodChangePending &&
    !isSortByChangePending
  const isOrdersLoading =
    getOrders.isFetching ||
    isStatusChangePending ||
    isDeliveryMethodChangePending ||
    isSortByChangePending

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
      if (!trackingId || !token.trim()) return
      getNvOrder.mutate({
        trackingId,
        token: token.trim(),
      })
    },
    [token, getNvOrder]
  )

  const handleStatusChange = (status: string) => {
    startStatusChangeTransition(() => {
      setStatus(status)
    })
  }

  const handleDeliveryMethodChange = (deliveryMethod: string) => {
    startDeliveryMethodChangeTransition(() => {
      setDeliveryMethod(deliveryMethod)
    })
  }

  const handleSortByChange = (sortBy: string) => {
    startSortByChangeTransition(() => {
      setSortBy(sortBy)
    })
  }

  const ordersDisplay = useMemo(
    () =>
      filteredOrders.map((order) => (
        <Row
          key={order.orderId}
          order={order}
          onClickNvTid={
            showTid
              ? () => handleClickTrackingId(order.trackingId || '')
              : undefined
          }
        />
      )),
    [handleClickTrackingId, filteredOrders, showTid]
  )

  const renderOrders = () => {
    if (isOrdersLoading) {
      return <Skeleton />
    }

    if (!hasfilteredOrders) {
      return (
        <div className='col-span-full mx-auto py-5 text-sm'>
          No orders found
        </div>
      )
    }

    return ordersDisplay
  }

  return (
    <div className='min-h-[100dvh] min-w-max overflow-y-hidden'>
      <div className='mx-auto flex max-w-[1450px] flex-col p-3'>
        <OptionsHeader
          token={token}
          status={status}
          onStatusChange={handleStatusChange}
          onTokenChange={setToken}
          isDisabled={getOrders.isFetching}
          deliveryMethod={deliveryMethod}
          onDeliveryMethodChange={handleDeliveryMethodChange}
          sortBy={sortBy}
          onSortByChange={handleSortByChange}
          searchPhrase={searchPhrase}
          onSearchPhraseChange={setSearchPhrase}
        />

        <RowsHeader className={colDimensions} showTid={showTid} />

        <div
          className={cn(
            'scrollbar grid max-h-[calc(100vh-68px-12px-12px-65px)] w-full items-center overflow-x-hidden overflow-y-auto text-sm',
            colDimensions
          )}
        >
          <AnimatePresence>{renderOrders()}</AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default Oms
