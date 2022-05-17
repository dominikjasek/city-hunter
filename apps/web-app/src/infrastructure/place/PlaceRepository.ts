import { IPlaceSuggestion } from '@api/place/types/place.types'
import { axiosApiInstance } from '~/infrastructure/axios/axios'

export enum IPlaceStatus {
    pending = 'pending',
    accepted = 'accepted',
    rejected = 'rejected'
}

export class PlaceRepository {
  public async createPlaceSuggestion(riddlePhotoUrl: string, name: string, lat: string, lng: string): Promise<IPlaceSuggestion> {

    return (await axiosApiInstance.post('/places/suggest', {
      riddlePhotoUrl,
      name,
      lat,
      lng
    })).data
  }

  public async getPlaceSuggestions(status?: IPlaceStatus): Promise<IPlaceSuggestion[]> {
    const statusPath = status ? `/${status}` : ''
    return (await axiosApiInstance.get(`/places${statusPath}`)).data
  }

  public async changePlaceSuggestionStatus(suggestionId: number, status: IPlaceStatus): Promise<IPlaceSuggestion[]> {
    return (await axiosApiInstance.post('/places/change-status', {
      id: suggestionId,
      status
    })).data
  }
}

export const usePlaceRepository = () => {
  return new PlaceRepository()
}