import { axiosApiInstance } from '~/infrastructure/axios/axios'
import { IPlaceSuggestBody, IPlaceSuggestion } from '~/infrastructure/place/Place.types'

export enum IPlaceStatus {
    pending = 'pending',
    accepted = 'accepted',
    rejected = 'rejected'
}

export class PlaceRepository {
  public async createPlaceSuggestion(suggestPlaceBody: IPlaceSuggestBody): Promise<IPlaceSuggestion> {
    return (await axiosApiInstance.post('/place/suggest', suggestPlaceBody)).data
  }

  public async getPlaceSuggestions(status?: IPlaceStatus): Promise<IPlaceSuggestion[]> {
    const statusPath = status ? `/${status}` : ''
    return (await axiosApiInstance.get(`/place${statusPath}`)).data
  }

  public async changePlaceSuggestionStatus(suggestionId: number, status: IPlaceStatus): Promise<IPlaceSuggestion[]> {
    return (await axiosApiInstance.post('/place/change-status', {
      id: suggestionId,
      status
    })).data
  }
}

export const usePlaceRepository = () => {
  return new PlaceRepository()
}