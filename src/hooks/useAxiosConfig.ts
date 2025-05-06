import { useAuth } from '@clerk/clerk-react'
import { AxiosRequestConfig } from 'axios'

const useAxiosConfig = () => {
  const { getToken } = useAuth()

  const initConfig = async <T>(params?: T): Promise<AxiosRequestConfig> => ({
    headers: {
      Authorization: `Bearer ${await getToken()}`,
    },
    params: params,
  })

  return {
    initConfig,
  }
}

export default useAxiosConfig
