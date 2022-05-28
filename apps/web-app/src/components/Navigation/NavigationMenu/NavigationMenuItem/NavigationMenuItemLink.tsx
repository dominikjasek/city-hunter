import React from 'react'
import { Link, useMatch } from 'react-router-dom'
import { useAuth } from '~/infrastructure/auth/UseAuth'
import './navigation-menu-item.scss'

export interface NavigationMenuItemProps {
    to: string
    label: string
    authRequired: boolean
    adminRequired?: boolean
}

export const NavigationMenuItem = (props: NavigationMenuItemProps) => {
  const { isAuthenticated } = useAuth()

  const isLinkCurrentlyVisited = useMatch(props.to)

  if (props.authRequired && !isAuthenticated) {
    return <></>
  }

  if (props.adminRequired && !isAuthenticated) {
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
