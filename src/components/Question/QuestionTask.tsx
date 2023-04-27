import { FC, useState } from 'react';
import { MapLocation, MapPicker } from '~/components/MapPicker/MapPicker';
import { Box, Button, Stack, Typography } from '@mui/material';
import Image from 'next/image';

interface QuestionTaskProps {
  city: {
    centerPoint: MapLocation;
    mapZoom: number;
  };
  title: string;
  questionDescription: string | null;
  questionImageUrl: string;
}

export const QuestionTask: FC<QuestionTaskProps> = (props) => {
  const [point, setPoint] = useState<MapLocation | null>(null);

  return (
    <Box
      sx={{
        mx: { xs: 0, sm: 1, md: 6 },
        px: { xs: 0, sm: 1, md: 2 },
      }}
    >
      <Stack
        direction={'row'}
        justifyContent={'center'}
        alignItems={'center'}
        gap={4}
      >
        <Box>
          <Typography variant={'h6'}>{props.title}</Typography>
          <Typography sx={{ mb: 2 }}>{props.questionDescription}</Typography>
        </Box>
      </Stack>
      <Stack
        mb={2}
        direction={{ xs: 'column', md: 'row' }}
        alignItems={'center'}
        gap={2}
      >
        <Box
          sx={{
            width: '100%',
            minWidth: { xs: 300, md: 400 },
            maxWidth: 700,
            height: '500px',
            position: 'relative',
            mx: 'auto',
            flex: { xs: 'none', md: 1 },
          }}
        >
          <Image
            src={props.questionImageUrl}
            alt={props.title}
            fill
            style={{
              objectFit: 'contain',
            }}
          />
        </Box>
        <Box sx={{ width: '100%', flex: { xs: 'none', md: 2 } }}>
          <MapPicker
            centerPoint={props.city.centerPoint}
            zoom={props.city.mapZoom}
            point={point}
            onClick={setPoint}
          />
        </Box>
      </Stack>
      <Button
        variant={'contained'}
        color={'secondary'}
        size={'large'}
        disabled={!point}
        sx={{ minWidth: '300px' }}
      >
        Potvrdit
      </Button>
    </Box>
  );
};
