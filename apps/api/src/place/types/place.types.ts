export interface IPlaceLocation {
  lat: string
  lng: string
}

export interface IPlaceSuggestion {
  id: number
  name: string
  location: IPlaceLocation
  riddlePhotoUrl: string
  solutionPhotoUrl?: string
}