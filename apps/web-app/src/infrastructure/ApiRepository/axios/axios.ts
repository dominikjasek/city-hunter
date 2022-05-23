import { useAuth0 } from '@auth0/auth0-react'
import axios from 'axios'

export const useAxios = () => {
  const { getAccessTokenSilently } = useAuth0()

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
