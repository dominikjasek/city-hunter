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
          <li className="nav-item normal-case">
            {auth.user?.photoUrl &&
                            <img className="rounded-full h-8 w-8"
                              src={'https://tailwindcss.com/_next/static/media/sarah-dayan.a8ff3f1095a58085a82e3bb6aab12eb2.jpg'}
                              alt="User"/>}
            <ChevronDownIcon
              className={'ml-1 h-5 w-5 transition duration-150 ease-in-out group-hover:text-opacity-80'}
              aria-hidden="true"
            />
          </li>
        }
        panel={
          <div className={'py-2 px-9 border-red-900 border-2'}>
                        to be implemented
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
