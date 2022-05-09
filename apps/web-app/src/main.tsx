import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { injectStore } from '~/infrastructure/axios/axios'
import { Contribute } from '~/routes/Contribute'
import { Play } from '~/routes/Game/Play'
import Home from '~/routes/Home'
import LoginRedirect from '~/routes/LoginRedirect'
import { Rules } from '~/routes/Rules'
import { Score } from '~/routes/Score'
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
            <Route path="/login-redirect" element={<LoginRedirect/>}/>
            <Route path="/hrat" element={<Play/>}/>
            <Route path="/pridat-misto" element={<Contribute/>}/>
            <Route path="/pravidla" element={<Rules/>}/>
            <Route path="/skore" element={<Score/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
