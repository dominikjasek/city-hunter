import { Outlet } from "react-router-dom"
import 'src/App.scss'

function App() {

  return (
    <div className="app">
      <header className="app-header">

        <Outlet />
      </header>
    </div>
  )
}

export default App
