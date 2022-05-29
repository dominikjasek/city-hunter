import { LoginRequest } from '@shared/types/Auth/Auth.types'
import { useEffect } from 'react'
import { BaseJson } from '~/components/UIBaseComponents/Json/BaseJson'
import { useAuthRepository } from '~/infrastructure/ApiRepository/AuthRepository'
import { useAuth } from '~/infrastructure/auth/UseAuth'

export const LoginRedirect = () => {
  const { user } = useAuth()
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
  }, [user])

  return (
    <div>
            LoginRedirect
      <div>
        <pre>{<BaseJson data={user}/>}</pre>
      </div>
    </div>
  )
}
