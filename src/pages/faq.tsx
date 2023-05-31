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
            <p>
              Hra začíná 4. 6. 2023 a trvá 20 dní. Každý večer bude zveřejněna nová otázka. V Třebíči v 19:00 a v Brně
              ve 20:00.
            </p>
            <p>
              Máte 1 hodinu na to, abyste na ni odpověděli tím, že označíte místo na mapě, kde si myslíte, že se nachází
              daný objekt zachycený na fotce. Pokud nejsou v zadání napsány jiné pokyny, vyznačujte vždy střed objektu.
              Za každou odpověď můžete získat maximálně 100 bodů.
            </p>
          </QuestionAnswer>
        </Question>

        <Question>
          <QuestionTitle>Na jakém území se hraje?</QuestionTitle>
          <QuestionAnswer>
            V Třebíči budou fotky rozmístěny po celém městě nebo dokonce v blízkém okolí města. V Brně se zaměříme pouze
            na centrum a jeho nejbližší okolí.
          </QuestionAnswer>
        </Question>

        <Question>
          <QuestionTitle>Od jaké chvíle se mi počítá čas?</QuestionTitle>
          <QuestionAnswer>
            Čas začíná bežet všem stejně bez ohledu na to, kdy si otázku otevřete. Tedy pro Třebíč v 19:00 a pro Brno ve
            20:00.
          </QuestionAnswer>
        </Question>

        <Question>
          <QuestionTitle>Jak se zaregistruji do hry?</QuestionTitle>
          <QuestionAnswer>
            Stačí{' '}
            <Link href={'/auth/login'} className={'no-style'}>
              <SecondaryText>se přihlásit</SecondaryText>
            </Link>{' '}
            a můžete začít odpovídat na otázky v Třebíči nebo (i) v Brně.
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
          <QuestionTitle>Můžu změnit svou odpověď?</QuestionTitle>
          <QuestionAnswer>Ne, jakmile odpovíte, odpověď už nelze změnit.</QuestionAnswer>
        </Question>

        <Question>
          <QuestionTitle>Můžu změnit svou přezdívku?</QuestionTitle>
          <QuestionAnswer>
            Ano, přezdívku si můžete změnit{' '}
            <Link href={'/auth/user'} className={'no-style'}>
              <SecondaryText>zde</SecondaryText>
            </Link>
            .
          </QuestionAnswer>
        </Question>

        <Question>
          <QuestionTitle>Můžeme hrát jako tým?</QuestionTitle>
          <QuestionAnswer>
            Ano, můžete a je to dobře! Mám radost, pokud se do hry zapojí například rodina a nad místy bude dumat
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
            <p>
              Autorem hry je{' '}
              <SecondaryText>
                <a className="no-style" href="mailto: dominik@dominikjasek.cz">
                  Dominik Jašek
                </a>
              </SecondaryText>
              . Brněnskými spoluautory jsou Maruška a Šimon Bendovi. Pokud máte jakékoli dotazy, nápady nebo připomínky,
              neváhejte mě kontaktovat.
            </p>
            <p>
              Hra City Hunter je inspirována online hrou{' '}
              <SecondaryText>
                <a className={'no-style'} href={'https://trebicsquared.cz'}>
                  trebicsquared
                </a>
              </SecondaryText>
              . Určitě se podívejte na otázky, které se v ní objevily. A nebojte, otázky se nebudou duplikovat.
            </p>
          </QuestionAnswer>
        </Question>
      </Box>
    </Box>
  );
};

export default FaqPage;
