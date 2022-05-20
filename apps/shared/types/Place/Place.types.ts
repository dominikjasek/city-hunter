export interface IPlaceLocation {
    lat: number;
    lng: number;
}

export interface IPlaceSuggestion {
    id: number
    name: string
    location: IPlaceLocation
    riddlePhotoUrl: string
    solutionPhotoUrl: string | null
}

export interface IPlaceSuggestBody {
    name: string
    location: IPlaceLocation
    riddlePhotoUrl: string
    solutionPhotoUrl?: string
}
