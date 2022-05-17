import React from 'react'
import { Link, useMatch } from 'react-router-dom'
import { useAuthStore } from '~/infrastructure/auth/AuthStore'
import './navigation-menu-item.scss'

export interface NavigationMenuItemProps {
    to: string
    label: string
    authRequired: boolean
    adminRequired?: boolean
}

export const NavigationMenuItem = (props: NavigationMenuItemProps) => {
  const { auth } = useAuthStore()

  const isLinkCurrentlyVisited = useMatch(props.to)

  if (props.authRequired && !auth.isLoggedIn) {
    return <></>
  }

  if (props.adminRequired && !auth.isAdmin) {
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
