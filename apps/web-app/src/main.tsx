import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import About from '~/src/routes/About'
import Home from '~/src/routes/Home'
import LoginRedirect from '~/src/routes/LoginRedirect'
import { store } from '~/src/store/store'
import '~/src/styles/index.scss'
import { injectStore } from '~/src/utils/axios/axios'
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
