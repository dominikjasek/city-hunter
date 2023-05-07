import { NextPage } from 'next';
import { Box, Stack, styled, TextField, Typography } from '@mui/material';
import { FC, useMemo, useState } from 'react';
import { evaluateScoreFromDistance } from '~/utils/score/evaluate-score';
import { SecondaryText } from '~/components/common/Typography/typography';
import Link from 'next/link';

const Question = styled(Box)(({ theme }) => ({
  margin: theme.spacing(4),
}));

const QuestionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightBold,
  marginBottom: theme.spacing(1),
}));

const QuestionAnswer = styled(Typography)(({ theme }) => ({
  marginLeft: theme.spacing(4),
}));

const ScoreCalculator: FC = () => {
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);

  const score = useMemo(() => evaluateScoreFromDistance(distance, duration), [distance, duration]);

  return (
    <Stack direction={{ xs: 'column', md: 'row' }} gap={2} sx={{ mt: 3, mb: 1 }} alignItems={'center'}>
      <TextField
        id="distance"
        label="Vzdálenost v metrech"
        variant="outlined"
        type="number"
        color={'secondary'}
        value={distance}
        onChange={(e) => setDistance(Number(e.target.value))}
      />
      <TextField
        id="time"
        label="Čas v sekundách"
        variant="outlined"
        type="number"
        color={'secondary'}
        value={duration}
        onChange={(e) => setDuration(Number(e.target.value))}
      />
      <Box>
        <Typography>
          Skóre: <SecondaryText>{score}</SecondaryText>
        </Typography>
      </Box>
    </Stack>
  );
};

const FaqPage: NextPage = () => {
  return (
    <Box maxWidth={'md'} mx={'auto'}>
      <Typography variant="h5" mb={3}>
        Často kladené otázky
      </Typography>
      <Box textAlign={'initial'}>
        <Question>
          <QuestionTitle>Jak se počítá skóre?</QuestionTitle>
          <QuestionAnswer>
            Skóre se počítá podle vzorce v němž figurují dva parametry - vzdálenost od správné odpovědi a rychlost. Je
            důležité trefit místo s co nejvyšší přesností, protože rozdíl pár metrů může výrazně ovlivnit skóre. Časová
            penalizace je znát hlavně na začátku kola, s rostoucím časem tato penalizace klesá. Pro lepší pochopení
            výpočtu skóre můžete použít tuto jednoduchou kalkulačku:
            <ScoreCalculator />
          </QuestionAnswer>
        </Question>

        <Question>
          <QuestionTitle>Můžeme hrát jako tým?</QuestionTitle>
          <QuestionAnswer>
            Ano, můžete a je to dobře! Máme radost, pokud se do hry zapojí například rodina a místa bude pátrat
            společně. Nastavte si prosím{' '}
            <Link href={'/auth/user'} className={'no-style'}>
              <SecondaryText>nastavte přezdívku</SecondaryText>
            </Link>{' '}
            tak, aby bylo jasné, že se jedná o tým a ne o jednotlivce.
          </QuestionAnswer>
        </Question>
      </Box>
    </Box>
  );
};

export default FaqPage;
