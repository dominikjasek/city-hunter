import React from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '~/infrastructure/auth/AuthStore'

export const NavigationMenuAuthItems = () => {
  const { auth } = useAuthStore()

  const logout = async () => {
    await auth.logout()
  }

  return (
    <Link to="#" className="nav-item" onClick={logout}>Odhlásit{'\u00a0'}se</Link>
  )
}