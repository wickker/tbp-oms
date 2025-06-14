import { toast } from 'react-toastify'
import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { AppError } from '@/@types/commons'

const handleError = (err: AxiosError<AppError> | Error) => {
  if (err instanceof AxiosError) {
    if (err.response?.data.message) {
      toast.error(err.response?.data.message)
      return
    }

    if (err.response?.data.detail) {
      toast.error(err.response?.data.detail)
      return
    }

    toast.error(err.message)
    return
  }

  toast.error(err.message)
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000,
    },
  },
  queryCache: new QueryCache({
    onError: handleError,
  }),
  mutationCache: new MutationCache({
    onError: handleError,
  }),
})

export default queryClient
