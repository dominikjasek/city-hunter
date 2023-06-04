import { FC } from 'react';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, useTheme } from '@mui/material';
import { TournamentUserScore } from '~/server/routers/ranking/types';
import { useUser } from '@clerk/nextjs';

export const TableMedals: FC<{ ranking: TournamentUserScore[] }> = ({ ranking }) => {
  const theme = useTheme();
  const { user } = useUser();

  return (
    <TableContainer
      sx={{
        backgroundColor: 'transparent',
        backgroundImage: 'inherit',
        maxWidth: 400,
        mx: 'auto',
        border: 0.3,
        borderColor: 'rgba(255,255,255,0.3)',
      }}
      component={Paper}
    >
      <Table size={'small'}>
        <TableHead>
          <TableRow>
            <TableCell align={'center'}>Pořadí</TableCell>
            <TableCell>Přezdívka</TableCell>
            <TableCell align={'right'} width={100}>
              Medaile
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ranking.map((row, index) => (
            <TableRow
              key={row.userId}
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
                backgroundColor: user?.id === row.userId ? theme.palette.primary.main : 'transparent',
                '&:hover': { backgroundColor: theme.palette.primary.main },
              }}
            >
              <TableCell align={'center'}>{index + 1}</TableCell>
              <TableCell component="th" scope="row">
                {row.nickName}
              </TableCell>
              <TableCell align="right">
                <Box>
                  {Array(row.medals.GOLD)
                    .fill(0)
                    .map((_, index) => (
                      <span key={index}>🥇</span>
                    ))}
                  {Array(row.medals.SILVER)
                    .fill(0)
                    .map((_, index) => (
                      <span key={index}>🥈</span>
                    ))}
                  {Array(row.medals.BRONZE)
                    .fill(0)
                    .map((_, index) => (
                      <span key={index}>🥉</span>
                    ))}
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
