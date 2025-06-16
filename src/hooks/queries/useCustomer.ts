import { useInfiniteQuery } from '@tanstack/react-query'
import { GetCustomersRequest } from '@/@types/customers'
import useAxiosConfig from '@/hooks/useAxiosConfig'
import api from '@/services/api'

const useCustomer = () => {
  const { initConfig } = useAxiosConfig()

  const useGetCustomersInfiniteQuery = (request: GetCustomersRequest) =>
    useInfiniteQuery({
      queryKey: ['customers', { name: request.name, email: request.email }],
      queryFn: ({ pageParam }) => api.getCustomers(initConfig(pageParam))(),
      getNextPageParam: (lastPage, pages) => {
        if (pages.length * lastPage.limit < lastPage.total) {
          return {
            ...request,
            limit: lastPage.limit,
            offset: lastPage.offset + lastPage.limit,
          }
        }
        return undefined
      },
      retry: false,
      initialPageParam: {
        ...request,
        limit: 20,
        offset: 0,
      },
    })

  return {
    useGetCustomersInfiniteQuery,
  }
}

export default useCustomer
