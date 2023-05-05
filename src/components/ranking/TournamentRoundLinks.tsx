import { FC } from 'react';
import { Stack, styled, Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';

const RoundOrderLink = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  cursor: 'default',
  color: theme.palette.secondary.main,
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
  }[];
}

export const TournamentRoundLinks: FC<TournamentRoundLinksProps> = ({ tournamentId, tournamentQuestions }) => {
  const router = useRouter();
  console.log('router.pathname', router);

  return (
    <Stack direction={'row'} mt={3} gap={2} justifyContent={'center'}>
      <Typography fontSize={'1.5rem'}>Kolo:</Typography>
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
