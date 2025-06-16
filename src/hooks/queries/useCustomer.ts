import { useQuery } from '@tanstack/react-query'
import { GetCustomersRequest } from '@/@types/customers'
import useAxiosConfig from '@/hooks/useAxiosConfig'
import api from '@/services/api'

const useCustomer = () => {
  const { initConfig } = useAxiosConfig()

  const useGetCustomersQuery = (request: GetCustomersRequest) =>
    useQuery({
      queryKey: ['customers'],
      queryFn: api.getCustomers(initConfig(request)),
      retry: false,
    })

  return {
    useGetCustomersQuery,
  }
}

export default useCustomer
