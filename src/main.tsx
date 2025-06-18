import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer, Slide } from 'react-toastify'
import { QueryClientProvider } from '@tanstack/react-query'
import { CapturedNetworkRequest } from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import App from '@/App.tsx'
import '@/index.css'
import Config from '@/configs'
import startMirage from '@/mirage'
import queryClient from '@/services/queryClient'

const options = {
  api_host: Config.VITE_REACT_APP_PUBLIC_POSTHOG_HOST,
  session_recording: {
    maskCapturedNetworkRequestFn: (request: CapturedNetworkRequest) => request,
  },
}

if (!Config.VITE_CLERK_PUBLISHABLE_KEY) {
  throw new Error('Missing Clerk publishable key')
}

startMirage()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PostHogProvider
      apiKey={Config.VITE_REACT_APP_PUBLIC_POSTHOG_KEY}
      options={options}
    >
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
      <ToastContainer
        position='top-center'
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='colored'
        transition={Slide}
      />
    </PostHogProvider>
  </StrictMode>
)
