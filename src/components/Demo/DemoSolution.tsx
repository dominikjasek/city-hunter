import { FC, useState } from 'react';
import { Box, Divider, Stack, Typography } from '@mui/material';
import { AnswerLocation, MapLocation } from '~/components/MapPicker/types';
import { MapWithAnswers } from '~/components/MapPicker/MapWithAnswers';
import { SecondaryText } from '~/components/common/Typography/typography';
import 'yet-another-react-lightbox/styles.css';
import Image from 'next/image';
import { LightBox } from '~/components/LightBox/LightBox';
import { createDurationString } from '~/utils/ranking/createDurationString';
import { imagePlaceholderProps } from '~/utils/image-placeholder/image-placeholder';

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

export const DemoSolution: FC<QuestionSolutionProps> = (props) => {
  const [index, setIndex] = useState(-1);

  return (
    <>
      <LightBox isOpen={index >= 0} index={index} imagesUrl={props.images} onClose={() => setIndex(-1)} />
      <Stack direction={'column'}>
        <Typography variant={'h5'}>
          Skóre: <SecondaryText>{props.score}</SecondaryText>/100
        </Typography>
        <Typography variant={'h6'}>Čas: {createDurationString(props.durationInSeconds)}</Typography>
        <Typography variant={'h6'}>Vzdálenost: {props.distance} m</Typography>
        <Divider sx={{ my: 2 }} />
        <Typography>{props.answerDescription}</Typography>
        <Stack direction={'column'}>
          <Stack direction={'row'} justifyContent={'center'} sx={{ width: '100%', mb: 3 }} gap={1} flexWrap={'wrap'}>
            {props.images.map((image) => (
              <Box
                key={image}
                sx={{
                  width: { xs: 150, sm: 200, md: 250 },
                  height: { xs: 150, sm: 200, md: 250 },
                  mt: 2,
                  position: 'relative',
                  cursor: 'pointer',
                }}
              >
                <Image
                  src={image}
                  alt={props.name}
                  fill
                  {...imagePlaceholderProps}
                  style={{
                    objectFit: 'contain',
                  }}
                  quality={35}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  onClick={() => setIndex(props.images.indexOf(image))}
                />
              </Box>
            ))}
          </Stack>

          <Box
            sx={{
              mx: 'auto',
              width: '100%',
              maxWidth: 700,
              height: { xs: 300, sm: 500 },
            }}
          >
            <MapWithAnswers
              locations={props.map.locations ?? []}
              zoom={props.map.zoom}
              centerPoint={props.map.centerPoint}
            />
          </Box>
        </Stack>
      </Stack>
    </>
  );
};
