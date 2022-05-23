import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'
import { Link } from 'react-router-dom'

export const NavigationMenuAuthItems = () => {
  const { logout } = useAuth0()

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