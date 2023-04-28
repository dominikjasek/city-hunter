import { FC } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import { AnswerLocation, MapLocation } from '~/components/MapPicker/types';
import { MapWithAnswers } from '~/components/MapPicker/MapWithAnswers';

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
}

export const Solution: FC<QuestionSolutionProps> = (props) => {
  return (
    <Stack direction={'column'}>
      <Typography>Skóre: {props.score}</Typography>
      <Typography>{props.answerDescription}</Typography>
      <Stack direction={'column'}>
        <Stack direction={'row'} sx={{ width: '100%' }} gap={1}>
          {props.images.map((image) => (
            <Box
              key={image}
              sx={{
                width: '100%',
                height: 300,
                position: 'relative',
                mx: 'auto',
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
