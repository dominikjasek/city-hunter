import { Outlet } from 'react-router-dom'
import Navigation from '~/components/Navigation/Navigation'
import '~/styles/app.scss'
import '~/styles/tailwind.css'

function App() {

  return (
    <div className="app h-screen flex flex-col overflow-hidden">
      <Navigation/>
      <div className="h-full">
        <Outlet/>
      </div>
    </div>
  )
}

export default App
