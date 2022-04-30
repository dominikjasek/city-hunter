import { axiosApiInstance } from '~/infrastructure/axios/axios'

export class AuthRepository {
  public async getProtectedRoute() {
    return (await axiosApiInstance.get('/auth/protected')).data
  }

  public async logout() {
    return (await axiosApiInstance.post('/auth/logout')).data
  }
}

export const useAuthRepository = () => {
  return new AuthRepository()
}