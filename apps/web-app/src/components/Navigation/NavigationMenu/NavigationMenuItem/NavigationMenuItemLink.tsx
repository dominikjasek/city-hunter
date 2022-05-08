import React from 'react'
import { Link, useMatch } from 'react-router-dom'
import './navigation-menu-item.scss'

export interface NavigationMenuItemProps {
    to: string,
    label: string,
}

export const NavigationMenuItem = (props: NavigationMenuItemProps) => {

  const isLinkCurrentlyVisited = useMatch(props.to)

  return (
    <Link to={props.to} className={`nav-item ${isLinkCurrentlyVisited ? 'active' : ''} `}>
      <li>
        {props.label}
      </li>
    </Link>
  )
}
