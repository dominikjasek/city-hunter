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
  centerPoint: MapLocation;
  zoom: number;
  point: MapLocation | null;
  onClick?: (point: MapLocation) => void;
}

export const MapPicker: FC<MapPickerProps> = ({
  point,
  centerPoint,
  zoom,
  onClick,
}: MapPickerProps) => {
  const handleMapClick: MapEventListener = (e, coordinates) => {
    if (e.type !== 'map-click') {
      return;
    }

    onClick?.({ lat: coordinates.y, lng: coordinates.x });
  };

  return (
    <div
      style={{
        touchAction: 'none',
        cursor: 'crosshair',
        width: '100%',
      }}
    >
      <Map
        height="500px"
        center={centerPoint}
        zoom={zoom}
        onEvent={handleMapClick}
      >
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
