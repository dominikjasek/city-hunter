import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import LoginModal from '~/src/components/Navigation/Login/LoginModal'
import './navigation-menu-item.scss'

const NavigationMenuAuthHandler = () => {
  let [ isOpen, setIsOpen ] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const logout = () => {
    console.log('logout')
  }

  if (false) {
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
                    <LoginModal onCloseModal={() => setIsOpen(false)} isOpen={isOpen}/>
        }
      </Link>
    </li>
  )
}

export default NavigationMenuAuthHandler
