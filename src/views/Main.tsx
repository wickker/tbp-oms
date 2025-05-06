import { SignedOut, SignedIn, SignIn } from '@clerk/clerk-react'
import Oms from '@/components/Oms'

const Main = () => {
  return (
    <>
      <SignedOut>
        <div className='flex min-h-[100dvh] min-w-max items-center justify-center overflow-y-hidden p-3'>
          <SignIn />
        </div>
      </SignedOut>

      <SignedIn>
        <Oms />
      </SignedIn>
    </>
  )
}

export default Main
