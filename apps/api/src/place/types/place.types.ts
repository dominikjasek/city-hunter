// import { ILocation } from '~/place/dto/locationDto'

//TODO: duplicate interface
export interface ILocation {
  lat: number;
  lng: number;
}

export interface IPlaceSuggestion {
  id: number
  name: string
  location: ILocation
  riddlePhotoUrl: string
  solutionPhotoUrl: string | null
}