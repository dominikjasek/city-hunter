import React, { FC } from 'react';
import MapMarkerOrange from '@public/map-marker-orange.svg';
import MapMarkerGrey from '@public/map-marker-grey.svg';
import MapMarkerGreen from '@public/map-marker-green.svg';
import { AnswerLocation, MapLocation } from '~/components/MapPicker/types';
import { Box, Stack, Typography } from '@mui/material';
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
import Image from 'next/image';

const LegendRow = ({ color, text }: { color: string; text: string }) => {
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <Box sx={{ borderRadius: '50%', width: 20, height: 20, backgroundColor: color, color: 'black', border: 2 }} />
      <Typography color={'black'} fontSize={'0.7rem'}>
        {text}
      </Typography>
    </Stack>
  );
};

const Legend = ({ showUserAnswer }: { showUserAnswer: boolean }) => {
  return (
    <Stack
      direction={'column'}
      sx={{
        position: 'absolute',
        zIndex: 100,
        borderRadius: 2,
        backgroundColor: 'rgba(255,255,255,0.75)',
        p: 1.3,
        m: 1,
      }}
      gap={0.5}
    >
      <LegendRow color="#FF9F10" text={'Vaše odpověď'} />
      <LegendRow color="#10DB61" text={'Správná odpověď'} />
      {showUserAnswer && <LegendRow color="#A7A7A7" text={'Odpověď uživatele'} />}
    </Stack>
  );
};

interface MapPickerProps {
  centerPoint: MapLocation;
  zoom: number;
  showLegendUserAnswer: boolean;
  locations: AnswerLocation[];
}

export const MapWithAnswers: FC<MapPickerProps> = ({
  locations,
  centerPoint,
  zoom,
  showLegendUserAnswer,
}: MapPickerProps) => {
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
        height: { xs: 300, md: 500 },
        borderRadius: 2,
        overflow: 'hidden',
      }}
    >
      <Legend showUserAnswer={showLegendUserAnswer} />

      <Map height="100%" center={centerPoint} zoom={zoom} loaderApiConfig={{ poi: true }}>
        <KeyboardControl />
        <ZoomControl />
        <MouseControl zoom={true} pan={true} wheel={true} />
        <SyncControl />
        <POILayer />
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
