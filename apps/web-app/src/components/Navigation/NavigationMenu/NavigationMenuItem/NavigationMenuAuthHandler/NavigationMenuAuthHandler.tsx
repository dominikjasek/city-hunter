import { ChevronDownIcon } from '@heroicons/react/solid'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import 'src/components/Navigation/NavigationMenu/NavigationMenuItem/navigation-menu-item.scss'
import { LoginModal } from '~/components/Login/LoginModal'
import {
  NavigationMenuAuthItems
} from '~/components/Navigation/NavigationMenu/NavigationMenuItem/NavigationMenuAuthHandler/NavigationMenuAuthItems'
import { BasePopover } from '~/components/UIBaseComponents/Popover/Popover'
import { useAuthStore } from '~/infrastructure/auth/AuthStore'
import { useWindowDimensions } from '~/infrastructure/window/windowDimensions'

const NavigationMenuAuthHandler = () => {
  const { auth } = useAuthStore()
  const { isMd } = useWindowDimensions()

  let [ isOpen, setIsOpen ] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  if (!auth.isLoggedIn) {
    return (
      <Link to={'#'} className="nav-item" onClick={openModal}>
        <li>
          <>Přihlásit se</>
          {isOpen &&
                        <LoginModal onCloseModal={closeModal} isOpen={isOpen}/>
          }
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
            isMd && auth.user?.photoUrl ?
              <img
                className={`rounded-full h-8 w-8 group-hover:ring-2 group-hover:ring-orange-700 ${isPopoverOpen ? 'ring-2 ring-orange-700' : ''}`}
                src={auth.user.photoUrl}
                alt={`${auth.user.name.firstName} ${auth.user.name.lastName}`}
              /> :
              <span>{`${auth.user?.name.firstName} ${auth.user?.name.lastName}`}</span>
          }
          <ChevronDownIcon
            className={`ml-1 h-5 w-5 transition ease-in-out ${isPopoverOpen ? 'text-orange-700' : ''} `}
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
