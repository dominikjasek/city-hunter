import { useAuth0 } from '@auth0/auth0-react'
import { LoginRequest } from '@shared/types/Auth/Auth.types'
import { useEffect } from 'react'
import { useAuthRepository } from '~/infrastructure/ApiRepository/AuthRepository'

export const LoginRedirect = () => {
  const { user } = useAuth0()
  const { login } = useAuthRepository()

  const onLogin = async () => {
    if (!user) {
      return
    }

    const loginRequest: LoginRequest = {
      email: user?.email || '',
      firstName: user.given_name || '',
      lastName: user.family_name || '',
      sub: user.sub || '',
    }
    await login(loginRequest)
  }

  useEffect(() => {
    onLogin()
  }, [ user ])

  return (
    <div>
            LoginRedirect
      <div>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </div>
    </div>
  )
}
