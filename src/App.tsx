import { Navigate, Route, Routes } from 'react-router'
import { ClerkProvider, useUser } from '@clerk/clerk-react'
import { RiLoader4Fill } from 'react-icons/ri'
import { NavigationBar } from '@/components/commons'
import Config from '@/configs'
import Customers from '@/views/Customers'
import Main from '@/views/Main'

const CheckAuth = () => {
  const { isSignedIn, isLoaded } = useUser()

  if (!isLoaded)
    return (
      <div className='flex min-h-[100dvh] min-w-max items-center justify-center overflow-y-hidden p-3'>
        <RiLoader4Fill className='h-10 w-10 animate-spin text-neutral-300' />
      </div>
    )

  if (!isSignedIn) return <Navigate to='/' />

  return null
}

const App = () => {
  return (
    <ClerkProvider
      publishableKey={Config.VITE_CLERK_PUBLISHABLE_KEY}
      afterSignOutUrl='/'
    >
      <CheckAuth />
      <NavigationBar />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/customers' element={<Customers />} />
      </Routes>
    </ClerkProvider>
  )
}

export default App
