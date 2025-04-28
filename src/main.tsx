import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer, Slide } from 'react-toastify'
import { QueryClientProvider } from '@tanstack/react-query'
import App from '@/App.tsx'
import '@/index.css'
import queryClient from '@/services/queryClient'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
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
  </StrictMode>
)
