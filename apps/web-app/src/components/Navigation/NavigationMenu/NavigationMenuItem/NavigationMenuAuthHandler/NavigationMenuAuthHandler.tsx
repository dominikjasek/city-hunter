import { ChevronDownIcon } from '@heroicons/react/solid'
import React from 'react'
import { Link } from 'react-router-dom'
import 'src/components/Navigation/NavigationMenu/NavigationMenuItem/navigation-menu-item.scss'
import { NavigationMenuAuthItems } from '~/components/Navigation/NavigationMenu/NavigationMenuItem/NavigationMenuAuthHandler/NavigationMenuAuthItems'
import { BasePopover } from '~/components/UIBaseComponents/Popover/Popover'
import { useAuth } from '~/infrastructure/auth/UseAuth'
import { useWindowDimensions } from '~/infrastructure/window/windowDimensions'

const NavigationMenuAuthHandler = () => {
  const { loginWithRedirect, isAuthenticated, user } = useAuth()

  const { isMd } = useWindowDimensions()

  if (!isAuthenticated) {
    return (
      <Link to={'#'} className="nav-item" onClick={() => loginWithRedirect({
        screen_hint: 'signup',
        display: 'popup',
      })}>
        <li>
                    Přihlásit se
        </li>
      </Link>
    )
  }

  if (!isMd) {
    return <NavigationMenuAuthItems/>
  }

  return (
    <BasePopover
      className={'mr-auto'}
      button={(isPopoverOpen) =>
        <li className='nav-item normal-case group'>
          {
            isMd && user?.picture ?
              <img
                className={`rounded-full h-8 w-8 group-hover:ring-2 group-hover:ring-orange-700 ${isPopoverOpen ? 'ring-2 ring-orange-700' : ''}`}
                src={user.picture}
                alt={`${user.name}`}
              /> :
              <span>{`${user?.name} aaa`}</span>
          }
          <ChevronDownIcon
            className={`ml-1 h-5 w-5 ${isPopoverOpen ? 'text-orange-700' : ''} `}
            aria-hidden="true"
          />
        </li>
      }
      panel={
        <div className={'py-1 px-9 rounded-md shadow-md bg-blue-700'}>
          <NavigationMenuAuthItems/>
        </div>
      }
    />

  )

}

export default NavigationMenuAuthHandler
