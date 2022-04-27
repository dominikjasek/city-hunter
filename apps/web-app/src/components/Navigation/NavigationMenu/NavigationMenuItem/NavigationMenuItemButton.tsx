import React, { ReactNode } from 'react'
import './navigation-menu-item.scss'

export interface NavigationMenuItemButtonProps {
    onClickCb: () => void
    innerContent: ReactNode,
}

const NavigationMenuItem = (props: NavigationMenuItemButtonProps) => {
  return (
    <li className="nav-item">
      <div onClick={props.onClickCb}>
        {props.innerContent}
      </div>
    </li>
  )
}

export default NavigationMenuItem
