import { IPlaceSuggestion } from '@shared/types/Place/Place.types'
import React, { useEffect, useState } from 'react'
import { PlaceSuggestionBox } from '~/components/PlaceSuggestion/PlaceSuggestionBox'
import { IPlaceStatus, usePlaceRepository } from '~/infrastructure/ApiRepository/PlaceRepository'

export const ManagePlaceSuggestions = () => {
  const placeRepository = usePlaceRepository()

  const [ placeSuggestions, setPlaceSuggestions ] = useState<IPlaceSuggestion[]>([])

  const fetchPendingPlaceSuggestions = async () => {
    const placeSuggestionsResponse = await placeRepository.getPlaceSuggestions(IPlaceStatus.pending)
    setPlaceSuggestions(placeSuggestionsResponse)
  }

  const changeStatus = async (placeSuggestionId: number, status: IPlaceStatus) => {
    await placeRepository.changePlaceSuggestionStatus(placeSuggestionId, status)
    setPlaceSuggestions(placeSuggestions.filter(ps => ps.id !== placeSuggestionId))
  }

  useEffect(() => {
    fetchPendingPlaceSuggestions()
  }, [])

  if (placeSuggestions.length === 0) {
    return <div>Nejsou dostupné žádné návrhy míst ke zpracování</div>
  }

  return (
    <div>
      <h1 className={'text-2xl uppercase mb-8'}>Návrhy míst ke schválení</h1>

      {placeSuggestions.map(placeSuggestion => (
        <PlaceSuggestionBox
          key={placeSuggestion.id}
          className={'m-4'}
          placeSuggestion={placeSuggestion}
          onAccept={() => changeStatus(placeSuggestion.id, IPlaceStatus.accepted)}
          onReject={() => changeStatus(placeSuggestion.id, IPlaceStatus.rejected)}
        />
      ))}

    </div>
  )
}
