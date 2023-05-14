import React, { FC } from 'react';
import {
  KeyboardControl,
  Map,
  Marker,
  MarkerLayer,
  MouseControl,
  POILayer,
  SyncControl,
  ZoomControl,
} from 'react-mapycz';
import { MapEventListener } from 'react-mapycz/src/Map';
import MapMarker from '@public/map-marker-orange.svg';
import Image from 'next/image';
import { MapLocation } from '~/components/MapPicker/types';
import { Box } from '@mui/material';

interface MapPickerProps {
  centerPoint: MapLocation;
  zoom: number;
  point: MapLocation | null;
  onClick?: (point: MapLocation) => void;
}

export const MapPicker: FC<MapPickerProps> = ({ point, centerPoint, zoom, onClick }: MapPickerProps) => {
  const handleMapClick: MapEventListener = (e, coordinates) => {
    if (e.type !== 'map-click') {
      return;
    }

    onClick?.({ lat: coordinates.y, lng: coordinates.x });
  };

  return (
    <Box
      sx={{
        touchAction: 'none',
        cursor: 'crosshair',
        width: '100%',
        height: '100%',
        borderRadius: 2,
        overflow: 'hidden',
      }}
    >
      <Map
        width="100%"
        height="100%"
        center={centerPoint}
        zoom={zoom}
        onEvent={handleMapClick}
        loaderApiConfig={{ poi: true }}
      >
        <KeyboardControl />
        <ZoomControl />
        <MouseControl zoom={true} pan={true} wheel={true} />
        <SyncControl />
        <POILayer />
        <MarkerLayer>
          <Marker
            coords={point ?? { lat: 0, lng: 0 }}
            options={{
              url: () => (
                <Image
                  alt={'Map marker'}
                  src={MapMarker}
                  style={{
                    width: '30px',
                    height: '40px',
                    transform: 'translate(-4px, -10px)',
                    opacity: Boolean(point) ? 0.9 : 0,
                  }}
                />
              ),
            }}
          />
        </MarkerLayer>
      </Map>
    </Box>
  );
};
