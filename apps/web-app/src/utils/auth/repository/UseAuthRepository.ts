import useAxios from '~/src/utils/axios/axios'

export const useAuthRepository = () => {
  const axios = useAxios()

  const getProtectedRoute = async () => (await axios.get('/auth/protected')).data

  return {
    getProtectedRoute
  }
}