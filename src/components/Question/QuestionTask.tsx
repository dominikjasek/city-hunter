import { FC, useState } from 'react';
import { MapPicker } from '~/components/MapPicker/MapPicker';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import Image from 'next/image';
import { MapLocation } from '~/components/MapPicker/types';
import { LightBox } from '~/components/LightBox/LightBox';
import LoadingButton from '@mui/lab/LoadingButton';

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
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [point, setPoint] = useState<MapLocation | null>(null);

  const theme = useTheme();

  return (
    <>
      <LightBox isOpen={isLightboxOpen} imagesUrl={[props.questionImageUrl]} onClose={() => setIsLightboxOpen(false)} />
      <Box
        sx={{
          mx: { xs: 0, sm: 1, md: 6 },
          px: { xs: 0, sm: 1, md: 2 },
        }}
      >
        <Stack mb={2} direction={'column'} alignItems={'center'} gap={2}>
          <Box>
            <Typography variant={'h6'}>{props.title}</Typography>
            <Typography sx={{ mb: 2 }}>{props.questionDescription}</Typography>
          </Box>
          <Box
            sx={{
              minWidth: 300,
              minHeight: 300,
              position: 'relative',
              flex: { xs: 'none' },
              cursor: 'pointer',
            }}
          >
            <Image
              src={props.questionImageUrl}
              alt={props.title}
              fill
              style={{
                objectFit: 'contain',
              }}
              onClick={() => setIsLightboxOpen(true)}
            />
          </Box>
          <Box sx={{ width: '100%', flex: { xs: 'none', md: 3 } }}>
            <MapPicker
              centerPoint={props.city.centerPoint}
              zoom={props.city.mapZoom}
              point={point}
              onClick={setPoint}
            />
          </Box>
          <LoadingButton
            variant={'contained'}
            color={'secondary'}
            size={'large'}
            loading={props.isSubmitting}
            sx={{
              width: 'calc(100% - 20px)',
              py: 2,
              mx: 'auto',
              position: 'relative',
              top: -85,
              zIndex: 1000,
              display: point ? 'inherit' : 'none',
              '&.Mui-disabled': {
                backgroundColor: theme.palette.grey.A400,
              },
            }}
            onClick={() => props.onSubmit(point!)}
          >
            Potvrdit
          </LoadingButton>
        </Stack>
      </Box>
    </>
  );
};
