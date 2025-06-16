import { SignedIn } from '@clerk/clerk-react'
import CustomersPage from '@/components/Customers'

const Customers = () => {
  return (
    <SignedIn>
      <div className='min-h-[100dvh] min-w-max'>
        <div className='mx-auto flex max-w-[1450px] flex-col p-3'>
          <CustomersPage />
        </div>
      </div>
    </SignedIn>
  )
}

export default Customers
