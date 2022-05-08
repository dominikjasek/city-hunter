import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ITokens, IUser, UserRole } from '~/infrastructure/auth/auth.types'
import { useAuthStore } from '~/infrastructure/auth/AuthStore'

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
    role: searchParams.get('role') as UserRole ?? '',
    photoUrl: searchParams.get('photoUrl') ?? '',
  }

  const tokens: ITokens = {
    access_token: searchParams.get('access_token') ?? '',
    refresh_token: searchParams.get('refresh_token') ?? '',
  }

  useEffect(() => {
    auth.setUser(user)
    auth.setTokens(tokens)
    navigate('/')
  }, [])

  return (<></>)
}

export default LoginRedirect