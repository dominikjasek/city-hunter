import { IPlaceSuggestion } from '@api/place/types/place.types'
import React, { useEffect, useState } from 'react'
import { PlaceSuggestionBox } from '~/components/PlaceSuggestion/PlaceSuggestionBox'
import { IPlaceStatus, usePlaceRepository } from '~/infrastructure/place/PlaceRepository'

export const ManagePlaceSuggestions = () => {
  const placeRepository = usePlaceRepository()

  const [ placeSuggestions, setPlaceSuggestions ] = useState<IPlaceSuggestion[]>([])

  const fetchPendingPlaceSuggestions = async () => {
    const placeSuggestionsResponse = await placeRepository.getPlaceSuggestions(IPlaceStatus.pending)
    setPlaceSuggestions(placeSuggestionsResponse)

  }

  useEffect(() => {
    fetchPendingPlaceSuggestions()
  }, [])

  return (
    <div>
      <button onClick={fetchPendingPlaceSuggestions}>
                get suggestions
      </button>
      <div>
        {placeSuggestions.map(placeSuggestion => (
          <PlaceSuggestionBox className={'m-4'} placeSuggestion={placeSuggestion} key={placeSuggestion.id}/>
        ))}
      </div>

    </div>
  )
}