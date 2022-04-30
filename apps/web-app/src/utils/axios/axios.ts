import { Store } from '@reduxjs/toolkit'
import axios from 'axios'
import { ITokens } from '~/src/utils/auth/auth.types'
import { setTokens } from '~/src/utils/auth/AuthSlice'

let store: Store | null = null

export const injectStore = (_store: Store) => {
  store = _store
}

export const axiosApiInstance = axios.create()
axiosApiInstance.defaults.baseURL = import.meta.env.VITE_REACT_APP_API_URL

// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
  async config => {
    config.headers = {
      'Authorization': `Bearer ${(store?.getState().auth.tokens as ITokens).access_token}`
    }
    return config
  }
)

// Response interceptor for API calls
axiosApiInstance.interceptors.response.use((response) => {
  return response
}, async function (error) {
  const originalRequest = error.config
  if (error.response?.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true

    const refreshAccessToken = async (refresh_token: string): Promise<ITokens> => {
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/auth/refresh`, null,
        {
          headers: {
            Authorization: `Bearer ${refresh_token}`
          }
        })
      return response.data
    }

    const {
      access_token,
      refresh_token
    } = await refreshAccessToken((store!.getState().auth.tokens as ITokens).refresh_token)
        store!.dispatch(setTokens({ access_token, refresh_token }))
        return axiosApiInstance(originalRequest)
  }
  return Promise.reject(error)
})

