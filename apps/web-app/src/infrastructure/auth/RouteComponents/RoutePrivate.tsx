import React, { FC, PropsWithChildren } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthStore } from '~/infrastructure/auth/AuthStore'

type IProps = PropsWithChildren<any>

export const RoutePrivate: FC<IProps> = (props) => {
  const { auth } = useAuthStore()

  return (
    auth.isLoggedIn ? props.children : <Navigate to="/"/>
  )
}
