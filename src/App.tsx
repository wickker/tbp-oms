import { Route, Routes } from 'react-router'
import { ClerkProvider } from '@clerk/clerk-react'
import Config from './configs'
import Main from './views/Main'

const App = () => (
  <ClerkProvider
    publishableKey={Config.VITE_CLERK_PUBLISHABLE_KEY}
    afterSignOutUrl='/'
  >
    <Routes>
      <Route path='/' element={<Main />} />
    </Routes>
  </ClerkProvider>
)

export default App
