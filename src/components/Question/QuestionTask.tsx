import { FC, useState } from 'react';
import { MapPicker } from '~/components/MapPicker/MapPicker';
import { Box, Button, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import { MapLocation } from '~/components/MapPicker/types';

interface QuestionTaskProps {
  city: {
    centerPoint: MapLocation;
    mapZoom: number;
  };
  title: string;
  questionDescription: string | null;
  questionImageUrl: string;
  isSubmitting: boolean;
  onSubmit: (point: MapLocation) => void;
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
      <Stack direction={'row'} justifyContent={'center'} alignItems={'center'} gap={4}>
        <Box>
          <Typography variant={'h6'}>{props.title}</Typography>
          <Typography sx={{ mb: 2 }}>{props.questionDescription}</Typography>
        </Box>
      </Stack>
      <Stack mb={2} direction={{ xs: 'column', md: 'row' }} alignItems={'center'} gap={1}>
        <Box
          sx={{
            minWidth: { xs: 300, md: 400, lg: 500 },
            minHeight: { xs: 300, md: 500 },
            position: 'relative',
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
          <MapPicker centerPoint={props.city.centerPoint} zoom={props.city.mapZoom} point={point} onClick={setPoint} />
        </Box>
      </Stack>
      <Button
        variant={'contained'}
        color={'secondary'}
        size={'large'}
        disabled={!point || props.isSubmitting}
        sx={{ minWidth: '300px' }}
        onClick={() => props.onSubmit(point!)}
      >
        Potvrdit
      </Button>
    </Box>
  );
};
