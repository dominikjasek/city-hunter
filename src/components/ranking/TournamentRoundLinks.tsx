import { FC } from 'react';
import { Stack, styled, Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';

const RoundOrderLink = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.main,
  '&:hover': {
    color: theme.palette.secondary.light,
    cursor: 'pointer',
  },
  [theme.breakpoints.up('sm')]: {
    fontSize: '1.2rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '1.4rem',
  },
}));

interface TournamentRoundLinksProps {
  tournamentId: string;
  tournamentQuestions: {
    id: number;
    roundOrder: number | null;
  }[];
}

export const TournamentRoundLinks: FC<TournamentRoundLinksProps> = ({ tournamentId, tournamentQuestions }) => {
  const router = useRouter();

  return (
    <Stack direction={'row'} my={3} gap={2} justifyContent={{ xs: 'start', lg: 'center' }} sx={{ overflowX: 'auto' }}>
      <RoundOrderLink color={'white'} sx={{ color: 'white', '&:hover': { color: 'white', cursor: 'text' } }}>
        Kolo:
      </RoundOrderLink>
      <Link href={`/ranking/${tournamentId}`} className={'no-style'}>
        <RoundOrderLink
          mr={2}
          sx={{
            textDecoration: router.query.roundOrder === undefined ? 'underline' : 'none',
            textUnderlineOffset: 6,
          }}
        >
          CELKOVĚ
        </RoundOrderLink>
      </Link>
      {tournamentQuestions.map((question) => (
        <Link key={question.id} href={`/ranking/${tournamentId}/${question.roundOrder}`} className={'no-style'}>
          <RoundOrderLink
            sx={{
              textDecoration:
                router.asPath === `/ranking/${tournamentId}/${question.roundOrder}` ? 'underline' : 'none',
              textUnderlineOffset: 6,
            }}
          >
            {question.roundOrder}
          </RoundOrderLink>
        </Link>
      ))}
    </Stack>
  );
};
