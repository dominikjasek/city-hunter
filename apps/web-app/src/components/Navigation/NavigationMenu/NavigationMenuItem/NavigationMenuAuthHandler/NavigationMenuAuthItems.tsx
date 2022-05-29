import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '~/infrastructure/auth/UseAuth'

export const NavigationMenuAuthItems = () => {
  const { logout } = useAuth()

  return (
    <div>
      <Link to="/profil" className="nav-item">
                Profil
      </Link>
      <Link to="#" className="nav-item"
        onClick={() => logout({
          returnTo: window.location.origin
        })}>
                Odhlásit{'\u00a0'}se
      </Link>
    </div>
  )
}