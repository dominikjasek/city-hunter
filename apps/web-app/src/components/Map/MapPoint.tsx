import { GoogleMap, GoogleMapProps, Marker, useLoadScript } from '@react-google-maps/api'
import React, { CSSProperties, FC, useCallback, useRef } from 'react'
import { IMapPoint } from '~/components/Map/Map.types'
import { NonUndefined } from '~/types/utility/NonUndefined'

const options: GoogleMapProps['options'] = {
  zoomControl: true,
  streetViewControl: true,
  draggingCursor: 'grabbing',
}

interface IProps {
    point: IMapPoint
    mapContainerStyle?: CSSProperties
}

export const MapPoint: FC<IProps> = (props) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
  })

  const mapRef = useRef<any>()
  const onMapLoad = useCallback<NonUndefined<GoogleMapProps['onLoad']>>((map) => {
    mapRef.current = map
  }, [])

  if (loadError) return <span>Chyba při načítání Google mapy</span>
  if (!isLoaded) return <span>Načítání google mapy...</span>

  return (
    <GoogleMap
      id="map"
      mapContainerStyle={props.mapContainerStyle}
      zoom={12}
      center={props.point}
      options={options}
      onLoad={onMapLoad}
    >
      <Marker
        position={props.point}
      />
    </GoogleMap>
  )
}
