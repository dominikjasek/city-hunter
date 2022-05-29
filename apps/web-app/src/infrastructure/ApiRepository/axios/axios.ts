import axios from 'axios'
import { useAuth } from '~/infrastructure/auth/UseAuth'

export const useAxios = () => {
  const { getAccessTokenSilently } = useAuth()

  const axiosApiInstance = axios.create()
  axiosApiInstance.defaults.baseURL = import.meta.env.VITE_REACT_APP_API_URL

  axiosApiInstance.interceptors.request.use(
    async config => {
      const token = await getAccessTokenSilently()

      config.headers = {
        Authorization: `Bearer ${token}`
      }

      return config
    }
  )

  return axiosApiInstance
}
