import { SignedIn } from '@clerk/clerk-react'
import useCustomer from '@/hooks/queries/useCustomer'

const Customers = () => {
  const { useGetCustomersQuery } = useCustomer()
  const getCustomers = useGetCustomersQuery({ limit: 5, offset: 5 })

  console.log(getCustomers.data)

  return (
    <SignedIn>
      <div className='min-h-[100dvh] min-w-max'>
        <div className='mx-auto flex max-w-[1450px] flex-col p-3'>
          Customers Page
        </div>
      </div>
    </SignedIn>
  )
}

export default Customers
