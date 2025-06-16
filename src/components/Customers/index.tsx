import { useEffect, useRef, useState } from 'react'
import { useInView } from 'motion/react'
import { useDebounce } from 'use-debounce'
import { Button } from '@/components/commons'
import { Input } from '@/components/ui/input'
import useCustomer from '@/hooks/queries/useCustomer'
import { cn } from '@/utils/functions'
import Row from './Row'
import RowsHeader from './RowsHeader'
import Skeleton from './Skeleton'

const colDimensions =
  'grid-cols-[220px_240px_200px_minmax(270px,1fr)_220px_240px]'

type CustomersPageProps = {
  onOpenMessages: () => void
}

const CustomersPage = ({ onOpenMessages }: CustomersPageProps) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [debouncedName] = useDebounce(name.trim(), 500)
  const [debouncedEmail] = useDebounce(email.trim(), 500)
  const fetchMoreDataRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(fetchMoreDataRef)
  const { useGetCustomersInfiniteQuery } = useCustomer()
  const getCustomers = useGetCustomersInfiniteQuery({
    name: debouncedName || undefined,
    email: debouncedEmail || undefined,
  })
  const customers =
    getCustomers.data?.pages.flatMap((page) => page.customers) || []
  const hasCustomers =
    customers.length > 0 &&
    !getCustomers.isLoading &&
    !getCustomers.isRefetching
  const isLoading = getCustomers.isLoading || getCustomers.isRefetching

  const handleRefresh = () => getCustomers.refetch()

  const renderCustomers = () => {
    if (isLoading) {
      return <Skeleton />
    }

    if (!hasCustomers) {
      return (
        <div className='col-span-full mx-auto py-5'>No customers found</div>
      )
    }

    return customers.map((customer) => (
      <Row
        key={customer.id}
        customer={customer}
        onOpenMessages={onOpenMessages}
      />
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
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='w-[250px] text-xs'
              disabled={isLoading}
            />
          </div>
          <div className='flex flex-col gap-y-1'>
            <label className='text-xs font-semibold text-neutral-500'>
              Search By Email
            </label>
            <Input
              placeholder='Input email'
              type='text'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-[250px] text-xs'
              disabled={isLoading}
            />
          </div>
        </div>

        <Button
          size='sm'
          isLoading={getCustomers.isRefetching}
          onClick={handleRefresh}
          disabled={isLoading}
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
