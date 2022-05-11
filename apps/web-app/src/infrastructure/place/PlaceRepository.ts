import { axiosApiInstance } from '~/infrastructure/axios/axios'

export class PlaceRepository {
  public async createPlaceSuggestion(riddlePhotoUrl: string, name: string, lat: string, lng: string): Promise<void> {

    return (await axiosApiInstance.post('/place/suggest', {
      riddlePhotoUrl,
      name,
      lat,
      lng
    })).data
  }
}

export const usePlaceRepository = () => {
  return new PlaceRepository()
}