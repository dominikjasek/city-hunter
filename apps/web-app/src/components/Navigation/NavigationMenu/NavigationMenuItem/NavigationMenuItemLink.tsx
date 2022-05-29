import { UserPermission } from '@shared/types/Auth/Auth.types'
import React from 'react'
import { Link, useMatch } from 'react-router-dom'
import { useAuth } from '~/infrastructure/auth/UseAuth'
import './navigation-menu-item.scss'

export interface NavigationMenuItemProps {
    to: string
    label: string
    authRequired: boolean
    permissionsRequired?: UserPermission[]
}

export const NavigationMenuItem = (props: NavigationMenuItemProps) => {
  const { isAuthenticated, hasUserPermissions } = useAuth()

  const isLinkCurrentlyVisited = useMatch(props.to)

  if (props.authRequired && !isAuthenticated) {
    return <></>
  }

  if (props.permissionsRequired && !hasUserPermissions(props.permissionsRequired)) {
    return <></>
  }

  return (
    <Link to={props.to} className={`nav-item ${isLinkCurrentlyVisited ? 'active' : ''} `}>
      <li>
        {props.label}
      </li>
    </Link>
  )
}
