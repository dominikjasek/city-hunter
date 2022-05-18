import { GoogleMap, GoogleMapProps, Marker, useLoadScript } from '@react-google-maps/api'
import React, { CSSProperties, FC, useCallback, useEffect, useRef, useState } from 'react'
import { IMapPoint } from '~/components/Map/Map.types'
import { NonUndefined } from '~/types/utility/NonUndefined'

const options: GoogleMapProps['options'] = {
  zoomControl: true,
  streetViewControl: true,
  draggingCursor: 'grabbing',
  draggableCursor: 'crosshair',
}

const center: GoogleMapProps['center'] = {
  lat: 49.195835,
  lng: 16.607451,
}

interface IProps {
    onPointSelected: (_point: IMapPoint) => void
    selectedPoint: IMapPoint | null
    initialZoom?: number
    zoomOnPointChange?: boolean
    mapContainerStyle?: CSSProperties
}

export const MapPointPicker: FC<IProps> = (props) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
  })

  const [ selectedPoint, setSelectedPoint ] = useState<IMapPoint | null>((props.selectedPoint) ? props.selectedPoint : null)

  useEffect(() => {
    if (props.selectedPoint === null) {
      setSelectedPoint(null)
      return
    }
    setSelectedPoint(props.selectedPoint)
    if (props.zoomOnPointChange && mapRef.current) {
      console.log('zoomOnPointChange')
      mapRef.current.panTo(props.selectedPoint)
      mapRef.current.setZoom(18)
    }
  }, [ JSON.stringify(props.selectedPoint) ])

  const onMapClick = useCallback<NonUndefined<GoogleMapProps['onClick']>>((e) => {
    if (!e.latLng) {
      return
    }
    const selectedPoint: IMapPoint = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    }
    props.onPointSelected(selectedPoint)
  }, [])

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
      zoom={props.initialZoom || 12}
      center={(props.selectedPoint && props.zoomOnPointChange) ? selectedPoint : center}
      options={options}
      onClick={onMapClick}
      onLoad={onMapLoad}
    >
      <Marker
        key={`${selectedPoint?.lat}-${selectedPoint?.lng}`}
        position={selectedPoint}
      />
    </GoogleMap>
  )
}
