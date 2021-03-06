import { useAuth0 } from '@auth0/auth0-react'
import { AUTH0_CUSTOM_NAMESPACE, IUser, IUserWithCustomIdToken } from '~/infrastructure/auth/auth.types'

export const useAuth = () => {
  const { user, isAuthenticated, isLoading, logout, loginWithRedirect, getAccessTokenSilently } = useAuth0<IUserWithCustomIdToken>()

  const userWithPermissions: IUser = {
    ...user,
    permissions: user?.[ AUTH0_CUSTOM_NAMESPACE ]?.permissions ?? []
  }
  delete userWithPermissions[ AUTH0_CUSTOM_NAMESPACE ]

  const hasUserPermissions = (permissions: string[]) => {
    return permissions.every(permission => userWithPermissions.permissions.includes(permission))
  }

  return {
    user: userWithPermissions,
    isAuthenticated,
    isLoading,
    logout,
    loginWithRedirect,
    getAccessTokenSilently,
    hasUserPermissions
  }
}