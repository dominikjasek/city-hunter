import { Store } from '@reduxjs/toolkit'
import { ITokens } from '@shared/types/Auth/Auth.types'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { initialState } from '~/infrastructure/auth/auth.types'
import { setTokens, setUser } from '~/infrastructure/auth/AuthSlice'
import { IJwtDecoded } from '~/infrastructure/axios/axios.types'

let store: Store | null = null

export const injectStore = (_store: Store) => {
  store = _store
}

export const axiosApiInstance = axios.create()
axiosApiInstance.defaults.baseURL = import.meta.env.VITE_REACT_APP_API_URL

const refreshAccessToken = async (): Promise<void> => {
  const refreshToken = (store?.getState().auth.tokens as ITokens).refresh_token
  if (refreshToken == '') {
    return
  }

  try {
    const axiosRefreshTokenInstance = axios.create()
    const response = await axiosRefreshTokenInstance.post(`${import.meta.env.VITE_REACT_APP_API_URL}/auth/refresh`, null,
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`
        }
      })
        store!.dispatch(setTokens(response.data))
  } catch (e) {
    console.log('Error refreshing token')
        // Refresh token is invalid, logout on client
        store!.dispatch(setTokens(initialState.tokens))
        store!.dispatch(setUser(initialState.user))

  }
}

// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
  async config => {
    const accessToken = (store?.getState().auth.tokens as ITokens).access_token
    const decoded: IJwtDecoded = jwt_decode(accessToken)
    if (decoded.exp * 1000 < Date.now()) {
      await refreshAccessToken()
    }
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
    console.log('originalRequest', originalRequest)
    originalRequest._retry = true

    await refreshAccessToken()

    return axiosApiInstance(originalRequest)
  }
  return Promise.reject(error)
})

