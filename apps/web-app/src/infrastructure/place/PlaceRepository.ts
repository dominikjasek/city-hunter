import { axiosApiInstance } from '~/infrastructure/axios/axios'

export class PlaceRepository {
  public async createPlaceSuggestion(riddlePhoto: File, name: string, lat: string, lng: string): Promise<void> {
    const formData = new FormData()
    formData.append(
      'riddlePhoto',
      riddlePhoto,
      riddlePhoto.name
    )
    formData.set('name', name)
    formData.set('lat', lat)
    formData.set('lng', lng)

    return (await axiosApiInstance.post('/place/suggest', formData)).data
  }
}

export const usePlaceRepository = () => {
  return new PlaceRepository()
}