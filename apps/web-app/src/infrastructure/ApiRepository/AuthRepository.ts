import { LoginRequest, LoginResponse } from '@shared/types/Auth/Auth.types'
import { PingResponse } from '@shared/types/Ping/Ping.types'
import { useAxios } from '~/infrastructure/ApiRepository/axios/axios'

export const useAuthRepository = () => {
  const axios = useAxios()

  const getPing = async (): Promise<PingResponse> => (await axios.get('/ping')).data

  const login = async (loginRequestData: LoginRequest): Promise<LoginResponse> => (await axios.post('/auth/login', loginRequestData)).data // this will be called after auth0 login to create a new user in db

  return {
    getPing,
    login
  }

}