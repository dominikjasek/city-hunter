import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from '~/App'
import { RoutePrivate } from '~/infrastructure/auth/RouteComponents/RoutePrivate'
import { RouteAdmin } from '~/infrastructure/auth/RouteComponents/RouteRequiresAdmin'
import { Play } from '~/routes/Game/Play'
import { Home } from '~/routes/Home'
import { Login } from '~/routes/Login/Login'
import LoginRedirect from '~/routes/Login/LoginRedirect'
import { ManagePlaceSuggestions } from '~/routes/ManagePlaceSuggestions'
import { Rules } from '~/routes/Rules'
import { Score } from '~/routes/Score'
import { SuggestPlace } from '~/routes/SuggestPlace'

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App/>}>
          <Route path="/" element={<Home/>}/>
          <Route path="/login-redirect" element={<LoginRedirect/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/hrat" element={<RoutePrivate> <Play/> </RoutePrivate>}/>
          <Route path="/pridat-misto" element={<RoutePrivate> <SuggestPlace/> </RoutePrivate>}/>
          <Route path="/spravovat-navrhy" element={<RouteAdmin> <ManagePlaceSuggestions/> </RouteAdmin>}/>
          <Route path="/pravidla" element={<Rules/>}/>
          <Route path="/skore" element={<Score/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}