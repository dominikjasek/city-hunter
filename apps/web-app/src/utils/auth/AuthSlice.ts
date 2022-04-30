import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { initialState, ITokens, IUser } from '~/src/utils/auth/auth.types'

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload
    },
    setTokens: (state, action: PayloadAction<Partial<ITokens>>) => {
      if (state.user === null) {
        throw new Error('User is not set, can not set tokens')
      }

      state.user = {
        ...state.user,
        ...action.payload,
      }
    },
  },
})

export const { setUser, setTokens } = authSlice.actions
export const authReducer = authSlice.reducer