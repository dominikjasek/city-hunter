import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { injectStore } from '~/infrastructure/axios/axios'
import { Router } from '~/router'
import { store } from '~/store/store'
import '~/styles/index.scss'

injectStore(store)

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <Provider store={store}>
    <Router/>
  </Provider>
  // </React.StrictMode>
)
