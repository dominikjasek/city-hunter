import React, { FC, PropsWithChildren } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '~/infrastructure/auth/UseAuth'

type IProps = PropsWithChildren<any>

export const RequiredAuth: FC<IProps> = (props) => {
  const { isAuthenticated } = useAuth()

  return (
    isAuthenticated ? props.children : <Navigate to="/login"/>
  )
}
