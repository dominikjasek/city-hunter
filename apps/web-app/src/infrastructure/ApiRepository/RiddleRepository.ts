import { IRiddleWithAvailability } from '@shared/types/Riddle/Riddle.types'
import { AxiosInstance } from 'axios'
import { useAxios } from '~/infrastructure/ApiRepository/axios/axios'

export class RiddleRepository {
  constructor(private readonly axios: AxiosInstance) {
  }

  public async getRiddle(): Promise<IRiddleWithAvailability> {
    return (await this.axios.get('/riddle')).data
  }
}

export const useRiddleRepository = () => {
  const axios = useAxios()

  return new RiddleRepository(axios)
}