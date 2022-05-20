import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ITokens } from '@shared/types/Auth/Auth.types'
import { initialState, IUser } from '~/infrastructure/auth/auth.types'
import { AuthLocalStorage } from '~/infrastructure/auth/AuthLocalStorage'

const authLocalStorage = new AuthLocalStorage()

export const authSlice = createSlice({
  name: 'auth',
  initialState: authLocalStorage.auth ?? initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser | null>) => {
      state.user = action.payload
      authLocalStorage.setUser(action.payload)
    },
    setTokens: (state, action: PayloadAction<ITokens>) => {
      if (state.user === null) {
        throw new Error('User is null, hence can not set tokens!')
      }

      state.tokens = action.payload

      authLocalStorage.setTokens(action.payload)
    },
  },
})

export const { setUser, setTokens } = authSlice.actions
export const authReducer = authSlice.reducer