import { Route, Routes } from 'react-router'
import { ClerkProvider } from '@clerk/clerk-react'
import { NavigationBar } from '@/components/commons'
import Config from '@/configs'
import Main from '@/views/Main'

const App = () => {
  return (
    <ClerkProvider
      publishableKey={Config.VITE_CLERK_PUBLISHABLE_KEY}
      afterSignOutUrl='/'
    >
      <NavigationBar />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/customers' element={<div>Customers</div>} />
      </Routes>
    </ClerkProvider>
  )
}

export default App
