export interface IPlaceLocation {
  lat: string
  lng: string
}

export interface IPlaceSuggestion {
  name: string
  location: IPlaceLocation
  riddlePhotoUrl: string
  answerPhotoUrl?: string
}
