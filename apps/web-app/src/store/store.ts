import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from '~/infrastructure/auth/AuthSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// store.subscribe(() => {
//   console.log('Store subscribe')
// })
