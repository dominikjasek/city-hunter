import { FC, useMemo, useState } from 'react';
import { evaluateScoreFromDistance } from '~/utils/score/evaluate-score';
import { Box, Stack, TextField, Typography } from '@mui/material';
import { SecondaryText } from '~/components/common/Typography/typography';

export const ScoreCalculator: FC = () => {
  const [distance, setDistance] = useState('0');
  const [duration, setDuration] = useState('0');

  const score = useMemo(() => evaluateScoreFromDistance(Number(distance), Number(duration)), [distance, duration]);

  return (
    <Stack direction={{ xs: 'column', md: 'row' }} gap={2} sx={{ mt: 3, mb: 1 }} alignItems={'center'}>
      <TextField
        id="distance"
        label="Vzdálenost v metrech"
        variant="outlined"
        type="number"
        color={'secondary'}
        value={distance}
        onChange={(e) => setDistance(e.target.value)}
      />
      <TextField
        id="time"
        label="Čas v sekundách"
        variant="outlined"
        type="number"
        color={'secondary'}
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
      />
      <Box>
        <Typography>
          Skóre: <SecondaryText>{score}</SecondaryText>/100
        </Typography>
      </Box>
    </Stack>
  );
};
