import { FC } from 'react';
import { Box, Stack, styled, Typography, useTheme } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';

const FONT_SIZE_MULTIPLIER = 1.4;

const RoundOrderLink = styled(Typography)<{ isActive: boolean }>(({ theme, isActive }) => ({
  color: theme.palette.secondary.main,
  borderColor: theme.palette.secondary.main,
  borderBottom: isActive ? 'solid 2px' : 0,
  fontWeight: isActive ? 'bold' : 'normal',
  fontSize: theme.typography.fontSize * FONT_SIZE_MULTIPLIER,
  '&:hover': {
    color: theme.palette.secondary.light,
    cursor: 'pointer',
  },
}));

interface TournamentRoundLinksProps {
  tournamentId: string;
  tournamentQuestions: {
    id: number;
    roundOrder: number | null;
    startDate: Date;
    endDate: Date;
  }[];
}

export const TournamentRoundLinks: FC<TournamentRoundLinksProps> = ({ tournamentId, tournamentQuestions }) => {
  const router = useRouter();
  const theme = useTheme();

  const now = new Date();

  return (
    <Stack direction={'row'} my={3} gap={2} justifyContent={{ xs: 'start', lg: 'center' }} sx={{ overflowX: 'auto' }}>
      <Typography fontSize={theme.typography.fontSize * FONT_SIZE_MULTIPLIER}>Kolo:</Typography>
      <Link href={`/ranking/${tournamentId}`} className={'no-style'}>
        <RoundOrderLink isActive={router.query.roundOrder === undefined} mr={2}>
          CELKOVĚ
        </RoundOrderLink>
      </Link>
      {tournamentQuestions.map((question) => (
        <Box key={question.id} sx={{ display: 'inline' }}>
          {now.getTime() < question.endDate.getTime() ? (
            <Typography sx={{ cursor: 'not-allowed', fontSize: theme.typography.fontSize * FONT_SIZE_MULTIPLIER }}>
              {question.roundOrder}
            </Typography>
          ) : (
            <Link href={`/ranking/${tournamentId}/${question.roundOrder}`} className={'no-style'}>
              <RoundOrderLink isActive={router.asPath === `/ranking/${tournamentId}/${question.roundOrder}`}>
                {question.roundOrder}
              </RoundOrderLink>
            </Link>
          )}
        </Box>
      ))}
    </Stack>
  );
};
