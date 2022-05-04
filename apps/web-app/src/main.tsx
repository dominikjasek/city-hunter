import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { injectStore } from '~/infrastructure/axios/axios'
import { About } from '~/routes/About'
import Home from '~/routes/Home'
import LoginRedirect from '~/routes/LoginRedirect'
import { store } from '~/store/store'
import '~/styles/index.scss'
import App from './App'

injectStore(store)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App/>}>
            <Route path="/" element={<Home/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/login-redirect" element={<LoginRedirect/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
