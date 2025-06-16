import { useEffect, useRef } from 'react'
import { useInView } from 'motion/react'
import { Button } from '@/components/commons'
import { Input } from '@/components/ui/input'
import useCustomer from '@/hooks/queries/useCustomer'
import { cn } from '@/utils/functions'
import Row from './Row'
import RowsHeader from './RowsHeader'
import Skeleton from './Skeleton'

const colDimensions =
  'grid-cols-[220px_240px_200px_minmax(270px,1fr)_220px_240px]'

const CustomersPage = () => {
  const fetchMoreDataRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(fetchMoreDataRef)
  const { useGetCustomersInfiniteQuery } = useCustomer()
  const getCustomers = useGetCustomersInfiniteQuery({})
  const customers =
    getCustomers.data?.pages.flatMap((page) => page.customers) || []
  const hasCustomers =
    customers.length > 0 &&
    !getCustomers.isLoading &&
    !getCustomers.isRefetching

  const handleRefresh = () => getCustomers.refetch()

  const renderCustomers = () => {
    if (getCustomers.isLoading || getCustomers.isRefetching) {
      return <Skeleton />
    }

    if (!hasCustomers) {
      return (
        <div className='col-span-full mx-auto py-5 text-sm'>
          No customers found
        </div>
      )
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
      <div className='flex items-center justify-between pb-3'>
        <div className='flex gap-x-3'>
          <div className='flex flex-col gap-y-1'>
            <label className='text-xs font-semibold text-neutral-500'>
              Search By Name
            </label>
            <Input
              placeholder='Input first or last name'
              type='text'
              // value={searchPhrase}
              // onChange={(e) => onSearchPhraseChange(e.target.value)}
              className='w-[250px] text-xs'
              // disabled={isOrdersLoading}
            />
          </div>
          <div className='flex flex-col gap-y-1'>
            <label className='text-xs font-semibold text-neutral-500'>
              Search By Email
            </label>
            <Input
              placeholder='Input email'
              type='text'
              // value={searchPhrase}
              // onChange={(e) => onSearchPhraseChange(e.target.value)}
              className='w-[250px] text-xs'
              // disabled={isOrdersLoading}
            />
          </div>
        </div>

        <Button
          size='sm'
          isLoading={getCustomers.isRefetching}
          onClick={handleRefresh}
        >
          Refresh
        </Button>
      </div>

      <div className={cn('grid items-center', colDimensions)}>
        <RowsHeader />
      </div>

      <div
        className={cn(
          'scrollbar grid max-h-[calc(100dvh-48px-60px-12px-12px-12px-68px)] overflow-y-auto pb-3',
          colDimensions
        )}
      >
        {renderCustomers()}

        {getCustomers.isFetchingNextPage && <Skeleton />}
        <div ref={fetchMoreDataRef} />
      </div>
    </>
  )
}

export default CustomersPage
