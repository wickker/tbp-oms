import useCustomer from '@/hooks/queries/useCustomer'
import { cn } from '@/utils/functions'
import Row from './Row'
import RowsHeader from './RowsHeader'

const colDimensions =
  'grid-cols-[220px_240px_220px_minmax(250px,1fr)_220px_240px]'

const CustomersPage = () => {
  const { useGetCustomersQuery } = useCustomer()
  const getCustomers = useGetCustomersQuery({ limit: 5, offset: 5 })

  console.log(getCustomers.data)
  const customers = getCustomers.data?.customers || []

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
        {customers.map((customer) => (
          <Row key={customer.id} customer={customer} />
        ))}
      </div>
    </>
  )
}

export default CustomersPage
