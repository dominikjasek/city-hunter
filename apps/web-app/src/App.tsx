import { Outlet } from 'react-router-dom'
import Navigation from '~/components/Navigation/Navigation'
import { useAuth } from '~/infrastructure/auth/UseAuth'
import '~/styles/app.scss'
import '~/styles/tailwind.css'

export const App = () => {

  const { isLoading } = useAuth()

  if (isLoading) return <div>Loading...</div>

  return (
    <div className="app flex flex-col overflow-hidden">
      <Navigation/>
      <Outlet/>
    </div>
  )
}
