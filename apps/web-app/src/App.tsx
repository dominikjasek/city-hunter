import { Outlet } from "react-router-dom"
import Navigation from "~/src/components/Navigation/Navigation"
import '~/src/styles/app.scss'
import '~/src/styles/tailwind.css'
import { AuthProvider } from "~/src/utils/auth/AuthProvider"

function App() {

  return (
    <AuthProvider>
      <div className="app">
        <Navigation />
        <div className="app-header">
          <Outlet />
        </div>
      </div>
    </AuthProvider>
  )
}

export default App
