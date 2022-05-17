import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { RoutePrivate } from '~/infrastructure/auth/RouteComponents/RoutePrivate'
import { RouteAdmin } from '~/infrastructure/auth/RouteComponents/RouteRequiresAdmin'
import { injectStore } from '~/infrastructure/axios/axios'
import { Play } from '~/routes/Game/Play'
import { Home } from '~/routes/Home'
import { Login } from '~/routes/Login/Login'
import LoginRedirect from '~/routes/Login/LoginRedirect'
import { ManagePlaceSuggestions } from '~/routes/ManagePlaceSuggestions'
import { Rules } from '~/routes/Rules'
import { Score } from '~/routes/Score'
import { SuggestPlace } from '~/routes/SuggestPlace'
import { store } from '~/store/store'
import '~/styles/index.scss'
import App from './App'

injectStore(store)

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App/>}>
          <Route path="/" element={<Home/>}/>
          <Route path="/login-redirect" element={<LoginRedirect/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/hrat" element={<Play/>}/>
          <Route path="/pridat-misto" element={<RoutePrivate> <SuggestPlace/> </RoutePrivate>}/>
          <Route path="/spravovat-navrhy" element={<RouteAdmin> <ManagePlaceSuggestions/> </RouteAdmin>}/>
          <Route path="/pravidla" element={<Rules/>}/>
          <Route path="/skore" element={<Score/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
  // </React.StrictMode>
)
