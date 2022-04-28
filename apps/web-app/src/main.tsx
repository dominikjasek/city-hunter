import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import About from "~/src/routes/About"
import Home from "~/src/routes/Home"
import LoginRedirect from "~/src/routes/LoginRedirect"
import '~/src/styles/index.scss'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login-redirect" element={<LoginRedirect />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
