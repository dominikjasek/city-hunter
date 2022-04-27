import React from 'react'
import { Link } from 'react-router-dom'
import './navigation-menu-item.scss'

export interface NavigationMenuItemProps {
    to: string,
    label: string,
}

const NavigationMenuItem = (props: NavigationMenuItemProps) => {
  return (
    <li className="nav-item">
      <Link to={props.to}>
        {props.label}
      </Link>
    </li>
  )
}

export default NavigationMenuItem
