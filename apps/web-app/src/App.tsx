import { useAuth0 } from '@auth0/auth0-react'
import { Outlet } from 'react-router-dom'
import Navigation from '~/components/Navigation/Navigation'
import '~/styles/app.scss'
import '~/styles/tailwind.css'

export const App = () => {

  const { isLoading } = useAuth0()

  if (isLoading) return <div>Loading...</div>

  return (
    <div className="app flex flex-col overflow-hidden">
      <Navigation/>
      <Outlet/>
    </div>
  )
}
