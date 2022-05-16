import { ChevronDownIcon } from '@heroicons/react/solid'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { LoginModal } from '~/components/Login/LoginModal'
import { BasePopover } from '~/components/UIBaseComponents/Popover/Popover'
import { useAuthStore } from '~/infrastructure/auth/AuthStore'
import './navigation-menu-item.scss'

const NavigationMenuAuthHandler = () => {
  const { auth } = useAuthStore()

  let [ isOpen, setIsOpen ] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const logout = async () => {
    await auth.logout()
  }

  if (auth.isLoggedIn) {
    return (
      <BasePopover
        button={
          <li className="nav-item normal-case ">
            {
              auth.user?.photoUrl ?
                <img className="rounded-full h-8 w-8"
                  src={auth.user.photoUrl}
                  alt={`${auth.user.name.firstName} ${auth.user.name.lastName}`}
                /> :
                <span>{`${auth.user?.name.firstName} ${auth.user?.name.lastName}`}</span>
            }
            <ChevronDownIcon
              className={'ml-1 h-5 w-5 transition duration-150 ease-in-out group-hover:text-opacity-80'}
              aria-hidden="true"
            />
          </li>
        }
        panel={
          <div className={'py-2 px-9 rounded-md shadow-md bg-blue-700'}>
            <Link to="#" className="nav-item" onClick={logout}>Odhlásit{'\u00a0'}se</Link>
          </div>
        }
      />

    )
  }

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

export default NavigationMenuAuthHandler
