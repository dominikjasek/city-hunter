import { FC } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import { AnswerLocation, MapLocation } from '~/components/MapPicker/types';
import { MapWithAnswers } from '~/components/MapPicker/MapWithAnswers';
import { SecondaryText } from '~/components/common/Typography/typography';

export interface QuestionSolutionProps {
  name: string;
  answerDescription: string | null;
  images: string[];
  map: {
    locations?: AnswerLocation[];
    centerPoint: MapLocation;
    zoom: number;
  };
  score: number;
  durationInSeconds: number;
  distance: number;
}

export const Solution: FC<QuestionSolutionProps> = (props) => {
  const minutes = Math.floor(props.durationInSeconds / 60);
  const seconds = Math.ceil(props.durationInSeconds - minutes * 60);
  const duration = `${minutes}:${String(seconds).padStart(2, '0')}`;

  return (
    <Stack direction={'column'}>
      <Typography variant={'h5'}>
        Skóre: <SecondaryText>{props.score}</SecondaryText>/100
      </Typography>
      <Typography variant={'h6'}>Čas: {duration}</Typography>
      <Typography variant={'h6'}>Vzdálenost: {props.distance} m</Typography>
      <Typography sx={{ mt: 2 }}>{props.answerDescription}</Typography>
      <Stack direction={'column'}>
        <Stack direction={'row'} justifyContent={'center'} sx={{ width: '100%', mb: 3 }} gap={1} flexWrap={'wrap'}>
          {props.images.map((image) => (
            <Box
              key={image}
              sx={{
                width: 250,
                maxWidth: 600,
                minHeight: 250,
                position: 'relative',
              }}
            >
              <Image
                src={image}
                alt={props.name}
                fill
                style={{
                  objectFit: 'contain',
                }}
              />
            </Box>
          ))}
        </Stack>

        <Box sx={{ width: 700, maxWidth: '100%', mx: 'auto', flex: { xs: 'none', md: 2 } }}>
          <MapWithAnswers locations={props.map.locations ?? []} zoom={props.map.zoom} centerPoint={props.map.centerPoint} />
        </Box>
      </Stack>
    </Stack>
  );
};
