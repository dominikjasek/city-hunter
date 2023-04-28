import React, { FC } from 'react';
import MapMarkerOrange from '@public/map-marker-orange.svg';
import MapMarkerGrey from '@public/map-marker-grey.svg';
import MapMarkerGreen from '@public/map-marker-green.svg';
import { AnswerLocation, MapLocation } from '~/components/MapPicker/types';
import { Box } from '@mui/material';
import { KeyboardControl, Map, Marker, MarkerLayer, MouseControl, SyncControl, ZoomControl } from 'react-mapycz';
import Image from 'next/image';

interface MapPickerProps {
  centerPoint: MapLocation;
  zoom: number;
  locations: AnswerLocation[];
}

export const MapWithAnswers: FC<MapPickerProps> = ({ locations, centerPoint, zoom }: MapPickerProps) => {
  const getSrcForLocation = (location: AnswerLocation) => {
    if (location.type === 'solution') return MapMarkerGreen;
    if (location.isHighlighted) return MapMarkerOrange;
    return MapMarkerGrey;
  };

  return (
    <Box
      sx={{
        touchAction: 'none',
        cursor: 'grab',
        width: '100%',
      }}
    >
      <Map height="500px" center={centerPoint} zoom={zoom}>
        <KeyboardControl />
        <ZoomControl />
        <MouseControl zoom={true} pan={true} wheel={true} />
        <SyncControl />
        <MarkerLayer>
          {locations.map((location) => (
            <Marker
              key={`${location.location.lat}-${location.location.lng}`}
              coords={location.location}
              options={{
                url: () => (
                  <Image
                    alt={'Map marker'}
                    src={getSrcForLocation(location)}
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
          ))}
        </MarkerLayer>
      </Map>
    </Box>
  );
};
