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
    height: '300px',
    width: '33.3333333%',
  } : {
    height: '33.333333%',
    width: '100%',
  }

  return (
    <div
      className={'flex flex-col md:flex-row rounded-[20px] shadow-xl bg-blue-700 h-[800px] md:h-[300px] overflow-hidden' + ` ${props.className}`}
    >
      <div className='flex flex-col p-3 h-1/3 md:h-auto md:w-1/3'>
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
      <BaseMapPicker onPointSelected={(point) => console.log(point)}
        selectedPoint={{
          lat: Number(props.placeSuggestion.location.lat),
          lng: Number(props.placeSuggestion.location.lng)
        }}
        initialZoom={15}
        mapContainerStyle={mapContainerStyle}
      />
      <img src={props.placeSuggestion.riddlePhotoUrl} className="h-1/3 md:h-auto md:w-1/3 object-cover "/>
    </div>
  )
}
