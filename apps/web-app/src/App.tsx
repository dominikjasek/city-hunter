import { Outlet } from "react-router-dom"
import Navigation from "~/src/components/Navigation/Navigation"
import '~/src/styles/app.scss'
import '~/src/styles/tailwind.css'

function App() {

  return (
    <div className="app">
      <Navigation />
      <div className="app-header">
        <Outlet />
      </div>
    </div>
  )
}

export default App
