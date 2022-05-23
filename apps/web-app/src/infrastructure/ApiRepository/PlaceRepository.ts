import { IPlaceSuggestBody, IPlaceSuggestion } from '@shared/types/Place/Place.types'
import { AxiosInstance } from 'axios'
import { useAxios } from '~/infrastructure/ApiRepository/axios/axios'

export enum IPlaceStatus {
    pending = 'pending',
    accepted = 'accepted',
    rejected = 'rejected'
}

export class PlaceRepository {
  constructor(private readonly axios: AxiosInstance) {
  }

  public async createPlaceSuggestion(suggestPlaceBody: IPlaceSuggestBody): Promise<IPlaceSuggestion> {
    return (await this.axios.post('/place/suggest', suggestPlaceBody)).data
  }

  public async getPlaceSuggestions(status?: IPlaceStatus): Promise<IPlaceSuggestion[]> {
    const statusPath = status ? `/${status}` : ''
    return (await this.axios.get(`/place${statusPath}`)).data
  }

  public async changePlaceSuggestionStatus(suggestionId: number, status: IPlaceStatus): Promise<IPlaceSuggestion[]> {
    return (await this.axios.post('/place/change-status', {
      id: suggestionId,
      status
    })).data
  }
}

export const usePlaceRepository = () => {
  const axios = useAxios()

  return new PlaceRepository(axios)
}