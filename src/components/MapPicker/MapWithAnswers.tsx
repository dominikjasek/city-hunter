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
import { useUser } from '@clerk/nextjs';

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

const Legend: FC<{ locations: AnswerLocation[] }> = ({ locations }) => {
  const { user } = useUser();

  const showMyAnswer = user?.id && locations.some((location) => location.type === 'user-answer' && location.isMyAnswer);
  const showCorrectAnswer = locations.some((location) => location.type === 'solution');
  const showSelectedAnswer = locations.some((location) => location.type === 'user-answer' && !location.isMyAnswer);

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
      {showMyAnswer && <LegendRow color="#FF9F10" text={'Vaše odpověď'} />}
      {showCorrectAnswer && <LegendRow color="#10DB61" text={'Správná odpověď'} />}
      {showSelectedAnswer && <LegendRow color="#A7A7A7" text={'Vybraná odpověď'} />}
    </Stack>
  );
};

interface MapPickerProps {
  centerPoint: MapLocation;
  zoom: number;
  locations: AnswerLocation[];
  width?: number | string;
  height?: number | string;
}

export const MapWithAnswers: FC<MapPickerProps> = ({
  locations,
  centerPoint,
  zoom,
  width = '100%',
  height = '100%',
}: MapPickerProps) => {
  const getSrcForLocation = (location: AnswerLocation) => {
    if (location.type === 'solution') return MapMarkerGreen;
    if (location.isMyAnswer) return MapMarkerOrange;
    return MapMarkerGrey;
  };

  return (
    <Box
      sx={{
        touchAction: 'none',
        cursor: 'grab',
        width,
        height,
        position: 'relative',
        borderRadius: 2,
        overflow: 'hidden',
      }}
    >
      <Legend locations={locations} />

      <Map height={'100%'} center={centerPoint} zoom={zoom} loaderApiConfig={{ poi: true }}>
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
