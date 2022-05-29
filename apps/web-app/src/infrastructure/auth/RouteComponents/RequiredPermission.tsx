import { Permission } from '@shared/types/Auth/Auth.types'
import React, { FC, PropsWithChildren } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '~/infrastructure/auth/UseAuth'

interface IProps extends PropsWithChildren<any> {
    permissions: Permission[]
}

export const RequiredPermission: FC<IProps> = (props) => {
  const { user } = useAuth()

  if (user.permissions.includes(props.permission)) {
    return <>{props.children}</>
  }

  return (
    <Navigate to="/login"/>
  )
}
