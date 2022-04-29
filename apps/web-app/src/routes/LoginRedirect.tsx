import { Fragment, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuthStore } from '~/src/utils/auth/AuthStore'

const LoginRedirect = () => {
  const { auth } = useAuthStore()
  const navigate = useNavigate()
  const [ searchParams ] = useSearchParams()

  const access_token = searchParams.get('access_token') ?? undefined
  const refresh_token = searchParams.get('refresh_token') ?? undefined

  useEffect(() => {
    auth.setTokens({ access_token, refresh_token })
    navigate('/')
  }, [])

  return (Fragment)
}

export default LoginRedirect