import { NextPage } from 'next';
import { Box, styled, Typography } from '@mui/material';
import { SecondaryText } from '~/components/common/Typography/typography';
import Link from 'next/link';
import { ScoreCalculator } from '~/components/ranking/ScoreCalculator';

const Question = styled(Box)(({ theme }) => ({
  margin: theme.spacing(4),
}));

const QuestionTitle = styled(Box)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightBold,
  marginBottom: theme.spacing(1),
  color: theme.palette.secondary.main,
}));

const QuestionAnswer = styled(Box)(({ theme }) => ({
  marginLeft: theme.spacing(4),
}));

const FaqPage: NextPage = () => {
  return (
    <Box maxWidth={'md'} mx={'auto'}>
      <Typography variant="h5" mb={3}>
        Často kladené otázky
      </Typography>
      <Box textAlign={'initial'}>
        <Question>
          <QuestionTitle>Jaké jsou pravidla hry?</QuestionTitle>
          <QuestionAnswer>
            Každý den bude zveřejněna ve 20:00 nová otázka. Máte 1 hodinu na to, abyste na ni odpověděli. Za každou
            odpověď můžete získat maximálně 100 bodů. Ve 21:00 budou dostupné výsledky kola.
          </QuestionAnswer>
        </Question>

        <Question>
          <QuestionTitle>Jak se počítá skóre?</QuestionTitle>
          <QuestionAnswer>
            Skóre se počítá podle vzorce, v němž figurují dva parametry, vzdálenost od správné odpovědi a rychlost. Je
            důležité trefit místo s co největší přesností, protože i rozdíl pár metrů může výrazně ovlivnit skóre.
            Časová penalizace je znát hlavně na začátku kola, s přibývajícím časem tato penalizace klesá. Pro lepší
            pochopení výpočtu skóre můžete použít tuto jednoduchou kalkulačku:
            <ScoreCalculator />
          </QuestionAnswer>
        </Question>

        <Question>
          <QuestionTitle>Můžu svou odpověď změnit?</QuestionTitle>
          <QuestionAnswer>Ne, jakmile odpovíte, odpověď už nelze změnit.</QuestionAnswer>
        </Question>

        <Question>
          <QuestionTitle>Můžeme hrát jako tým?</QuestionTitle>
          <QuestionAnswer>
            Ano, můžete a je to dobře! Máme radost, pokud se do hry zapojí například rodina a nad místy bude dumat
            společně. Prosím,{' '}
            <Link href={'/auth/user'} className={'no-style'}>
              <SecondaryText>nastavte si přezdívku</SecondaryText>
            </Link>{' '}
            tak, aby bylo jasné, že se jedná o tým a ne o jednotlivce.
          </QuestionAnswer>
        </Question>

        <Question>
          <QuestionTitle>Jaké jsou ceny?</QuestionTitle>
          <QuestionAnswer>
            Žádné. Hrajeme pro dobrý pocit a zábavu. Pokud by se ale našel někdo, kdo by chtěl přece jen věnovat do hry
            ceny, kontaktujte prosím autora hry.
          </QuestionAnswer>
        </Question>

        <Question>
          <QuestionTitle>Kdo je autorem hry?</QuestionTitle>
          <QuestionAnswer>
            Autorem hry je{' '}
            <SecondaryText>
              <a className="no-style" href="mailto: dominik@dominikjasek.cz">
                Dominik Jašek
              </a>
            </SecondaryText>
            . Pokud máte jakékoli dotazy, nápady nebo připomínky, neváhejte mě kontaktovat.
          </QuestionAnswer>
        </Question>
      </Box>
    </Box>
  );
};

export default FaqPage;
