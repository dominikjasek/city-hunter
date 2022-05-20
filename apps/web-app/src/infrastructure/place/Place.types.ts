// export interface IPlaceLocation {
//     lat: number
//     lng: number
// }

import { IPlaceLocation } from '@shared/types/Place/Place.types'

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