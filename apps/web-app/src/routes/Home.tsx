import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '~/src/utils/auth/AuthStore'
import { useAuthRepository } from '~/src/utils/auth/repository/UseAuthRepository'

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
        <div>email: {auth.user.email}</div>
        <button type="button" onClick={fetchProtectedData}>Fetch data</button>
        <ul>
          {data}
        </ul>
      </div>
    </div>

  )
}

export default Home
