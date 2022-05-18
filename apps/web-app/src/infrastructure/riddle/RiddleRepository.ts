import { IRiddleWithAvailability } from '@api/riddle/riddle.interface'
import { axiosApiInstance } from '~/infrastructure/axios/axios'

export class RiddleRepository {
  public async getRiddle(): Promise<IRiddleWithAvailability> {
    return (await axiosApiInstance.get('/riddle')).data
  }
}

export const useRiddleRepository = () => {
  return new RiddleRepository()
}