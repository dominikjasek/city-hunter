import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { LoginModal } from '~/components/Login/LoginModal'
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
      <li className="nav-item">
        <Link to="#" onClick={logout} className="navigation-menu-item-link">
                    Odhlásit se
        </Link>
      </li>
    )
  }

  return (
    <li className="nav-item">
      <Link to={'#'} onClick={openModal}>
        <>Přihlásit se</>
        {isOpen &&
                    <LoginModal onCloseModal={closeModal} isOpen={isOpen}/>
        }
      </Link>
    </li>
  )
}

export default NavigationMenuAuthHandler
