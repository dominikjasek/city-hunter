import { IRiddleWithAvailability } from '@shared/types/Riddle/Riddle.types'
import { axiosApiInstance } from '~/infrastructure/axios/axios'

export class RiddleRepository {
  public async getRiddle(): Promise<IRiddleWithAvailability> {
    return (await axiosApiInstance.get('/riddle')).data
  }
}

export const useRiddleRepository = () => {
  return new RiddleRepository()
}