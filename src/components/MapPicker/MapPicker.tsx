import React, { FC, useEffect, useState } from 'react';
import GoogleMapReact, { ClickEventValue } from 'google-map-react';

type Location = { lat: number; lng: number };
const defaultProps = {
  center: {
    lat: 49.21866559856739,
    lng: 15.880347529353775,
  },
  zoom: 14,
};

export const MapPicker: FC = () => {
  const [point, setPoint] = useState<Location>({
    lat: 49.21585775024331,
    lng: 15.876858895730825,
  });
  const [marker, setMarker] = useState<any>(null);

  const [maps, setMaps] = useState<any>(null);
  const [map, setMap] = useState<any>(null);

  useEffect(() => {
    if (!maps || !map) {
      return;
    }

    if (marker) {
      marker.setMap(null);
    }

    const newMarker = new maps.Marker({
      position: {
        lat: point.lat,
        lng: point.lng,
      },
      map,
    });

    setMarker(newMarker);
    console.log('newMarker', newMarker);
  }, [point]);

  const onMapClick = (e: ClickEventValue) => {
    console.log('map click', e);
    setPoint({ lat: e.lat, lng: e.lng });
  };

  const onMapLoaded = ({ map, maps }: any) => {
    setMaps(maps);
    setMap(map);
  };

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: 'AIzaSyDrZJiCrbSGVIW96qph0OJtfrFAz4scgGc',
          language: 'cs',
          region: 'cs',
          libraries: ['places'],
        }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        options={{ draggableCursor: 'crosshair' }}
        yesIWantToUseGoogleMapApiInternals
        onClick={onMapClick}
        onGoogleApiLoaded={onMapLoaded}
      />
    </div>
  );
};
