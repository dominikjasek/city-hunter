import { Outlet } from 'react-router-dom'
import Navigation from '~/components/Navigation/Navigation'
import '~/styles/app.scss'
import '~/styles/tailwind.css'

function App() {

  return (
    <div className="app flex flex-col overflow-hidden">
      <Navigation/>
      <Outlet/>
    </div>
  )
}

export default App
