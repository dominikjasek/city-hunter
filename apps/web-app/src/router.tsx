import { Permission } from '@shared/types/Auth/Auth.types'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { App } from '~/App'
import { Auth0ProviderWithHistory } from '~/infrastructure/auth/Auth0ProviderWithHistory'
import { RequiredAuth } from '~/infrastructure/auth/RouteComponents/RequiredAuth'
import { RequiredPermission } from '~/infrastructure/auth/RouteComponents/RequiredPermission'
import { Play } from '~/routes/Game/Play'
import { Home } from '~/routes/Home'
import { Login } from '~/routes/Login/Login'
import { LoginRedirect } from '~/routes/Login/LoginRedirect'
import { ManagePlaceSuggestions } from '~/routes/ManagePlaceSuggestions'
import { Rules } from '~/routes/Rules'
import { Score } from '~/routes/Score'
import { SuggestPlace } from '~/routes/SuggestPlace'
import { UserProfile } from '~/routes/UserProfile'

export const Router = () => {

  return (
    <BrowserRouter>
      <Auth0ProviderWithHistory
        domain={import.meta.env.VITE_AUTH0_DOMAIN}
        clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      >
        <Routes>
          <Route path="/" element={<App/>}>
            <Route path="/" element={<Home/>}/>
            <Route path="/login-redirect" element={<LoginRedirect/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/hrat" element={<RequiredAuth> <Play/> </RequiredAuth>}/>
            <Route path="/pridat-misto" element={<RequiredAuth> <SuggestPlace/> </RequiredAuth>}/>
            <Route path="/spravovat-navrhy" element={
              <RequiredPermission permissions={[Permission.ReadPlaceSuggestion, Permission.WritePlaceSuggestion]}>
                <ManagePlaceSuggestions/>
              </RequiredPermission>}/>
            <Route path="/pravidla" element={<Rules/>}/>
            <Route path="/skore" element={<Score/>}/>
            <Route path="/profil" element={<UserProfile/>}/>
          </Route>
        </Routes>

      </Auth0ProviderWithHistory>
    </BrowserRouter>
  )
}