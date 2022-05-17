import { IPlaceSuggestion } from '@api/place/types/place.types'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/outline'
import React, { CSSProperties, FC } from 'react'
import { BaseMapPicker } from '~/components/MapPicker/BaseMapPicker'
import { useWindowDimensions } from '~/infrastructure/window/windowDimensions'

interface IProps {
    placeSuggestion: IPlaceSuggestion
    className?: string
    onAccept: () => void
    onReject: () => void
}

export const PlaceSuggestionBox: FC<IProps> = (props) => {

  const { isMd } = useWindowDimensions()

  const mapContainerStyle: CSSProperties = isMd ? {
    width: '33.3333333%',
    flexGrow: 2,
  } : {
    height: '33.333333%',
    flexGrow: 2,

  }

  return (
    <div
      className={'flex flex-col md:flex-row rounded-[20px] shadow-xl bg-blue-700 h-[900px] md:h-[300px] overflow-hidden' + ` ${props.className}`}
    >
      <div className='flex flex-col p-3 md:h-auto'>
        <h4 className='pt-6 text-2xl'>
          {props.placeSuggestion.name}
        </h4>
        <div className={'flex flex-row my-auto justify-center items-center'}>
          <XCircleIcon
            className={'mx-1 duration-100 text-error-100 hover:text-error-200 hover:cursor-pointer w-24'}
            onClick={() => props.onReject()}
          />
          <CheckCircleIcon
            className={'mx-1 duration-100 text-success-100 hover:text-success-200 hover:cursor-pointer w-24'}
            onClick={() => props.onAccept()}
          />
        </div>
      </div>
      <img src={props.placeSuggestion.riddlePhotoUrl} className="max-h-[450px] md:h-auto object-contain"
        alt={props.placeSuggestion.name}/>
      <BaseMapPicker onPointSelected={(point) => console.log(point)}
        selectedPoint={{
          lat: Number(props.placeSuggestion.location.lat),
          lng: Number(props.placeSuggestion.location.lng)
        }}
        initialZoom={15}
        mapContainerStyle={mapContainerStyle}
      />
    </div>
  )
}
