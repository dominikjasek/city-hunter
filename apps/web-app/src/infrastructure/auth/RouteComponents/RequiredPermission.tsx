import { UserPermission } from '@shared/types/Auth/Auth.types'
import React, { FC, PropsWithChildren } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '~/infrastructure/auth/UseAuth'

interface IProps extends PropsWithChildren<any> {
    permissions: UserPermission[]
}

export const RequiredPermission: FC<IProps> = (props) => {
  const { isAuthenticated, hasUserPermissions } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/login"/>
  }

  if (hasUserPermissions(props.permissions)) {
    return <>{props.children}</>
  }

  return (
    <div>
      <h1>Pro přístup na tuto stránku nemáte dostatečné oprávnění. Prosím, kontaktujte administrátora.</h1>
    </div>
  )
}
