import { GoogleMap, GoogleMapProps, Marker, useLoadScript } from '@react-google-maps/api'
import React, { FC, useCallback, useEffect, useRef, useState } from 'react'
import { MapPoint } from '~/components/MapPicker/Map.types'
import { NonUndefined } from '~/types/utility/NonUndefined'

const mapContainerStyle = {
  height: '100vh',
  width: '100vw',
}

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
    onPointSelected: (_point: MapPoint) => void
    selectedPoint: MapPoint | null
    zoomOnPointChange: boolean
}

export const BaseMapPicker: FC<IProps> = (props) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
  })

  const [ selectedPoint, setSelectedPoint ] = useState<MapPoint | null>((props.selectedPoint) ? props.selectedPoint : null)

  useEffect(() => {
    if (props.selectedPoint === null) {
      setSelectedPoint(null)
      return
    }
    setSelectedPoint(props.selectedPoint)
    if (props.zoomOnPointChange && mapRef.current) {
      mapRef.current.panTo(props.selectedPoint)
      mapRef.current.setZoom(18)
    }
  }, [ JSON.stringify(props.selectedPoint) ])

  const onMapClick = useCallback<NonUndefined<GoogleMapProps['onClick']>>((e) => {
    if (!e.latLng) {
      return
    }
    const selectedPoint: MapPoint = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    }
    props.onPointSelected(selectedPoint)
  }, [])

  const mapRef = useRef<any>()
  const onMapLoad = useCallback<NonUndefined<GoogleMapProps['onLoad']>>((map) => {
    mapRef.current = map
  }, [])

  if (loadError) return <span>Error</span>
  if (!isLoaded) return <span>Loading...</span>

  return (
    <div>
      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={center}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        <Marker
          key={`${selectedPoint?.lat}-${selectedPoint?.lng}`}
          position={selectedPoint}
        />
      </GoogleMap>

    </div>
  )
}

