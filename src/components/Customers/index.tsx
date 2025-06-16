import { useEffect, useRef } from 'react'
import { useInView } from 'motion/react'
import useCustomer from '@/hooks/queries/useCustomer'
import { cn } from '@/utils/functions'
import Row from './Row'
import RowsHeader from './RowsHeader'
import Skeleton from './Skeleton'

const colDimensions =
  'grid-cols-[220px_240px_200px_minmax(270px,1fr)_220px_240px]'

const CustomersPage = () => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref)
  const { useGetCustomersInfiniteQuery } = useCustomer()
  const getCustomers = useGetCustomersInfiniteQuery({})
  const customers =
    getCustomers.data?.pages.flatMap((page) => page.customers) || []
  const hasCustomers = customers.length > 0 && !getCustomers.isLoading

  const renderCustomers = () => {
    if (getCustomers.isLoading) {
      return <Skeleton />
    }

    if (!hasCustomers) {
      return <div>No customers yet</div>
    }

    return customers.map((customer) => (
      <Row key={customer.id} customer={customer} />
    ))
  }

  useEffect(() => {
    if (isInView) {
      getCustomers.fetchNextPage()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView])

  return (
    <>
      <div className={cn('grid items-center', colDimensions)}>
        <RowsHeader />
      </div>

      <div
        className={cn(
          'scrollbar grid max-h-[calc(100dvh-48px-60px-12px-12px)] overflow-y-auto pb-3',
          colDimensions
        )}
      >
        {renderCustomers()}

        {getCustomers.isFetchingNextPage && <Skeleton />}
        <div ref={ref} />
      </div>
    </>
  )
}

export default CustomersPage
