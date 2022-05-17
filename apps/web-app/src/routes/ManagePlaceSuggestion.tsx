import React from 'react'
import { IPlaceStatus, usePlaceRepository } from '~/infrastructure/place/PlaceRepository'

export const ManagePlaceSuggestion = () => {
  const placeRepository = usePlaceRepository()

  return (
    <div>
      <button onClick={() => placeRepository.getPlaceSuggestions(IPlaceStatus.pending)}>
                get suggestions
      </button>
    </div>
  )
}