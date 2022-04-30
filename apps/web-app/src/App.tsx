import { Outlet } from 'react-router-dom'
import Navigation from '~/components/Navigation/Navigation'
import '~/styles/app.scss'
import '~/styles/tailwind.css'

function App() {

  return (
    <div className="app">
      <Navigation/>
      <div className="app-header">
        <Outlet/>
      </div>
    </div>
  )
}

export default App
