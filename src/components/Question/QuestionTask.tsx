import { FC, useState } from 'react';
import { MapPicker } from '~/components/MapPicker/MapPicker';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import Image from 'next/image';
import { MapLocation } from '~/components/MapPicker/types';
import { LightBox } from '~/components/LightBox/LightBox';
import LoadingButton from '@mui/lab/LoadingButton';
import { SecondaryText } from '~/components/common/Typography/typography';
import { imagePlaceholderProps } from '~/utils/image-placeholder/image-placeholder';

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
      <Stack mb={2} direction={{ xs: 'column', md: 'row' }} alignItems={'center'} gap={4}>
        <Box flex={1}>
          <Typography variant={'h6'}>
            <SecondaryText>{props.title}</SecondaryText>
          </Typography>
          <Typography sx={{ mt: 1, mb: 4 }} fontSize={theme.typography.fontSize * 1.2}>
            {props.questionDescription}
          </Typography>
          <Box
            sx={{
              minWidth: { xs: 300, sm: 370, md: 450, xl: 500 },
              minHeight: { xs: 300, sm: 370, md: 450, xl: 500 },
              position: 'relative',
              flex: { xs: 'none' },
              cursor: 'pointer',
            }}
          >
            <Image
              src={props.questionImageUrl}
              alt={props.title}
              fill
              {...imagePlaceholderProps}
              style={{
                objectFit: 'contain',
                objectPosition: 'top',
              }}
              quality={35}
              sizes="(max-width: 768px) 100vw, 33vw"
              onClick={() => setIsLightboxOpen(true)}
            />
          </Box>
        </Box>

        <Stack
          sx={{
            width: '100%',
            height: { xs: 550, md: `calc(100vh - 140px)` },
            position: 'relative',
          }}
          direction={'column'}
        >
          <Box
            sx={{
              width: '100%',
              height: `100%`,
            }}
          >
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
              position: 'absolute',
              top: 'calc(100% - 70px)',
              left: 'calc(10px)',
              zIndex: 1,
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
      </Stack>
    </>
  );
};
