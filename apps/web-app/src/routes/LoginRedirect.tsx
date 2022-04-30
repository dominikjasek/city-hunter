import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { IUser } from '~/src/utils/auth/auth.types'
import { useAuthStore } from '~/src/utils/auth/AuthStore'

const LoginRedirect = () => {
  const { auth } = useAuthStore()
  const navigate = useNavigate()
  const [ searchParams ] = useSearchParams()

  const user: IUser = {
    id: Number(searchParams.get('id')),
    name: {
      firstName: searchParams.get('firstName') ?? '',
      lastName: searchParams.get('lastName') ?? '',
    },
    email: searchParams.get('email') ?? '',
    tokens: {
      access_token: searchParams.get('access_token') ?? '',
      refresh_token: searchParams.get('refresh_token') ?? '',
    },
    photoUrl: searchParams.get('photoUrl') ?? '',
  }

  useEffect(() => {
    auth.setUser(user)
    navigate('/')
  }, [])

  return (<></>)
}

export default LoginRedirect