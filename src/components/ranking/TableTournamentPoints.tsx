import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, useTheme } from '@mui/material';
import { TournamentUserScore } from '~/server/routers/ranking/types';
import { FC } from 'react';

export const TableTournamentPoints: FC<{ ranking: TournamentUserScore[] }> = ({ ranking }) => {
  const theme = useTheme();

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
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align={'center'}>Pořadí</TableCell>
            <TableCell>Přezdívka</TableCell>
            <TableCell align={'right'}>Body</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ranking.map((row, index) => (
            <TableRow
              key={row.userId}
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
                backgroundColor: 'transparent',
                '&:hover': { backgroundColor: theme.palette.primary.main },
              }}
            >
              <TableCell align={'center'}>{index + 1}</TableCell>
              <TableCell component="th" scope="row">
                {row.nickName}
              </TableCell>
              <TableCell align="right">{row.score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
