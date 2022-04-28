import React from 'react'
import { GoogleLoginButton } from "react-social-login-buttons"

function LoginGoogleButton() {
  const handleGoogleLogin = () => {
    console.log('trying to google login')
    window.location.href = `${import.meta.env.VITE_REACT_APP_API_URL}/auth/google-login`
  }

  return (
    // @ts-ignore
    <GoogleLoginButton onClick={() => handleGoogleLogin()}>
      <span>Přihlásit se pomocí Google</span>
    </GoogleLoginButton>
  )
}

export default LoginGoogleButton