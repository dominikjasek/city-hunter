import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '~/infrastructure/auth/AuthStore'
import { useAuthRepository } from '~/infrastructure/auth/repository/UseAuthRepository'

const Home = () => {
  const { auth } = useAuthStore()
  const [ data, setData ] = useState<string>('')
  const { getProtectedRoute } = useAuthRepository()

  const fetchProtectedData = async () => {
    const val = await getProtectedRoute()
    setData(val.data)
  }

  return (
    <div>
      <Link to={'/about'}>About</Link>
      <div>
        <div>Hi, {auth.user?.name.firstName} {auth.user?.name.lastName}</div>
        {
          auth.user?.email &&
                    <div>email: {auth.user?.email}</div>
        }
        <img className="m-auto" src={auth.user?.photoUrl} alt={auth.user?.name.firstName}/>
        <button type="button" onClick={fetchProtectedData}>Fetch data</button>
        <ul>
          {data}
        </ul>
      </div>
    </div>

  )
}

export default Home
