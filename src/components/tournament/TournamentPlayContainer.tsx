import { FC } from 'react';
import { Card, CardActionArea, Stack, Typography } from '@mui/material';
import { formatDate } from '~/utils/formatter/dateFormatter';
import Image from 'next/image';

interface TournamentContainerProps {
  cityName?: string;
  description: string | null;
  tournamentId: string;
  tournamentName: string;
  previewImageUrl: string | null;
  startDate: Date | null;
  endDate: Date | null;
}

export const TournamentPlayContainer: FC<TournamentContainerProps> = (props) => {
  return (
    <Card
      variant="outlined"
      sx={{
        height: { xs: 120, sm: 200, md: 280 },
        mx: 'auto',
        my: 2,
        boxShadow: 2,
        backgroundColor: 'transparent',
        maxWidth: 'lg',
      }}
    >
      <CardActionArea
        sx={{
          width: '100%',
          height: '100%',
        }}
      >
        <Stack direction={'row'} width={'100%'} height={'100%'} justifyContent={'space-between'}>
          <Stack
            direction={'column'}
            width={'100%'}
            alignItems={'center'}
            justifyContent={'center'}
            sx={{ ml: 1, zIndex: 1, mr: -10 }}
          >
            <Typography variant={'h4'}>{props.tournamentName}</Typography>
            <Typography variant={'h6'}>{props.description}</Typography>
            {props.startDate && props.endDate && (
              <Typography variant={'h6'}>{`${formatDate(props.startDate)} - ${formatDate(props.endDate)}`}</Typography>
            )}
          </Stack>
          {props?.previewImageUrl && (
            <Image
              src={props.previewImageUrl}
              alt={props.cityName ?? props.tournamentName}
              width={1200}
              height={600}
              style={{
                height: '100%',
                width: 'auto',
                WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 100%)',
              }}
              quality={50}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          )}
        </Stack>
      </CardActionArea>
    </Card>
  );
};
