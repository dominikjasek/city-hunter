import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'
import { GoogleLoginButton } from 'react-social-login-buttons'
import { useAuthStore } from '~/infrastructure/auth/AuthStore'

function LoginGoogleButton() {
  const { auth } = useAuthStore()
  const { loginWithRedirect } = useAuth0()

  return (
  // @ts-ignore
    <GoogleLoginButton onClick={loginWithRedirect}>
      <span>Přihlásit se přes Google</span>
    </GoogleLoginButton>
  )
}

export default LoginGoogleButton