export interface IPlaceLocation {
    lat: number
    lng: number
}

export interface IPlaceSuggestBody {
    name: string
    location: IPlaceLocation
    riddlePhotoUrl: string
    solutionPhotoUrl?: string
}

export interface IPlaceSuggestion {
    id: number
    name: string
    location: IPlaceLocation
    riddlePhotoUrl: string
    solutionPhotoUrl: string | null
}