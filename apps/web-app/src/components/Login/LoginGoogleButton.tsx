import React from 'react'
import { GoogleLoginButton } from 'react-social-login-buttons'
import { useAuthStore } from '~/src/utils/auth/AuthStore'

function LoginGoogleButton() {
  const { auth } = useAuthStore()

  return (
  // @ts-ignore
    <GoogleLoginButton onClick={auth.loginWithGoogle}>
      <span>Přihlásit se přes Google</span>
    </GoogleLoginButton>
  )
}

export default LoginGoogleButton