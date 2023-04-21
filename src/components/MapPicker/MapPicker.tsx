import React, { FC } from 'react';
import {
  KeyboardControl,
  Map,
  Marker,
  MarkerLayer,
  MouseControl,
  SyncControl,
  ZoomControl,
} from 'react-mapycz';
import { MapEventListener } from 'react-mapycz/src/Map';
import MapMarker from '@public/map-marker.svg';
import Image from 'next/image';

export interface MapLocation {
  lat: number;
  lng: number;
}

interface MapPickerProps {
  point: MapLocation | null;
  onClick?: (point: MapLocation) => void;
}

const defaultProps = {
  center: {
    lat: 49.21866559856739,
    lng: 15.880347529353775,
  },
  zoom: 14,
};

export const MapPicker: FC<MapPickerProps> = ({
  point,
  onClick,
}: MapPickerProps) => {
  const handleMapClick: MapEventListener = (e, coordinates) => {
    if (e.type !== 'map-click') {
      return;
    }

    onClick?.({ lat: coordinates.y, lng: coordinates.x });
  };

  return (
    <div style={{ touchAction: 'none', cursor: 'crosshair' }}>
      <Map height="500px" center={defaultProps.center} onEvent={handleMapClick}>
        <KeyboardControl />
        <ZoomControl />
        <MouseControl zoom={true} pan={true} wheel={true} />
        <SyncControl />
        {point && (
          <MarkerLayer>
            <Marker
              coords={point}
              options={{
                url: () => (
                  <Image
                    alt={'Map marker'}
                    src={MapMarker}
                    style={{
                      width: '30px',
                      height: '40px',
                      transform: 'translate(-4px, -10px)',
                      opacity: 0.9,
                    }}
                  />
                ),
              }}
            />
          </MarkerLayer>
        )}
      </Map>
    </div>
  );
};
