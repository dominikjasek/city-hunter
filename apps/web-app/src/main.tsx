import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import '~/src/styles/index.scss'
import About from "~/src/routes/About"
import Home from "~/src/routes/Home"
import App from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode> 
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
