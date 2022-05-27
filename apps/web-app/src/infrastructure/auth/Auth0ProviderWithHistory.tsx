import { Auth0Provider } from '@auth0/auth0-react'
import React, { FC, PropsWithChildren } from 'react'
import { useNavigate } from 'react-router-dom'

export const Auth0ProviderWithHistory: FC<PropsWithChildren<any>> = ({ children }) => {
  const domain = import.meta.env.VITE_AUTH0_DOMAIN
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID
  const audience = import.meta.env.VITE_AUTH0_AUDIENCE

  const navigate = useNavigate()

  console.log(window.location.origin)
  const onRedirectCallback = (appState: any) => {
    navigate(appState?.returnTo || window.location.pathname)
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={`${window.location.origin}/login-redirect`}
      onRedirectCallback={onRedirectCallback}
      audience={audience}
      cacheLocation={'localstorage'}
    >
      {children}
    </Auth0Provider>
  )
}