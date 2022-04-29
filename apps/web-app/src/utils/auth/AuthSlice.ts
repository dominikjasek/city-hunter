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
      state.user.tokens = {
        ...state.user.tokens,
        ...action.payload,
      }
    },
  },
})

export const { setUser, setTokens } = authSlice.actions
export const authReducer = authSlice.reducer