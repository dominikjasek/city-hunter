import { FC } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import { MapLocation } from '~/components/MapPicker/MapPicker';

export interface QuestionSolutionProps {
  name: string;
  answerDescription: string | null;
  images: string[];
  answerLocation: MapLocation;
  correctLocation: MapLocation;
  score: number;
}

export const QuestionSolution: FC<QuestionSolutionProps> = (props) => {
  return (
    <Stack direction={'column'}>
      <Typography>Skóre: {props.score}</Typography>
      <Typography>{props.answerDescription}</Typography>
      <Stack direction={'column'}>
        <Stack direction={'row'} sx={{ width: '100%' }}>
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
        Tady bude Mapa
      </Stack>
    </Stack>
  );
};
