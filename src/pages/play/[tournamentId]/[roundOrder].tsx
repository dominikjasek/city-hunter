import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { trpc } from '~/utils/trpc';
import { Loader } from '~/components/common/Loader/Loader';
import { MessageBox } from '~/components/common/MessageBox/MessageBox';
import { QuestionTask } from '~/components/Question/QuestionTask';
import { MapLocation } from '~/components/MapPicker/types';
import { TRPCError } from '@trpc/server';
import { useMemo, useState } from 'react';
import { formatTime } from '~/utils/formatter/dateFormatter';
import Countdown, { zeroPad } from 'react-countdown';
import { Box } from '@mui/material';

const renderer = ({ hours, minutes, seconds }: { hours: number; minutes: number; seconds: number }) => (
  <span>
    {hours || ''}:{zeroPad(minutes)}:{zeroPad(seconds)}
  </span>
);

export const QuestionPlayPage: NextPage = () => {
  const { query } = useRouter();
  const { roundOrder, tournamentId } = query;
  const isRouterReady = useMemo(() => Boolean(roundOrder && tournamentId), [roundOrder, tournamentId]);
  const utils = trpc.useContext();

  const [pageState, setPageState] = useState<'waiting_for_submit' | 'answered' | 'expired'>('waiting_for_submit');
  const {
    data: questionData,
    isLoading: isQuestionLoading,
    isFetching: isQuestionFetching,
    refetch,
  } = trpc.question.getRoundQuestion.useQuery(
    { tournamentId: tournamentId?.toString() ?? 'absurd', roundOrder: Number(roundOrder) },
    { enabled: isRouterReady },
  );
  const { mutateAsync, isLoading: isSubmitting } = trpc.question.answerQuestion.useMutation();

  const handleSubmit = async (location: MapLocation) => {
    if (questionData!.status !== 'active') {
      return;
    }

    const result = await mutateAsync({ questionId: questionData!.question!.id, answer: location }).catch(
      (error: TRPCError) => {
        if (error.message === 'Question already finished') {
          setPageState('expired');
        }
      },
    );
    if (result?.success) {
      setPageState('answered');
      await utils.question.getRoundQuestion.invalidate();
    }
  };

  if (isQuestionLoading || isQuestionFetching) {
    return <Loader title={'Načítání...'} />;
  }

  if (!questionData) {
    return <MessageBox type={'warning'} message={'Něco se pokazilo, Data k otázce nebyly nalezeny.'} />;
  }

  if (questionData.status === 'expired_not_answered' || pageState === 'expired') {
    return <MessageBox type={'info'} message={'Kolo už je ukonečené. Bohužel jste nestihli odpovědět.'} />;
  }

  if (!questionData.question) {
    return <MessageBox type={'warning'} message={'Otázka nebyla nalezena. Kontaktujte administrátora.'} />;
  }

  if (questionData.status === 'not_started') {
    return (
      <>
        {questionData.question.startDate && (
          <Box maxWidth={600} mx={'auto'}>
            <MessageBox
              type={'info'}
              message={
                <>
                  {`Kolo začne v ${formatTime(questionData.question.startDate)}. Otázka se vám automaticky načte za `}
                  <Countdown
                    renderer={renderer}
                    onComplete={() => setTimeout(refetch, 300)}
                    date={questionData.question.startDate}
                  />
                </>
              }
            />
          </Box>
        )}
      </>
    );
  }

  if (pageState === 'answered' || questionData.status === 'answered') {
    return (
      <MessageBox
        type={'success'}
        message={`Vaše odpověď byla uložena. Výsledky budou zveřejněny v ${formatTime(questionData.question.endDate)}`}
      />
    );
  }

  return (
    <QuestionTask
      city={questionData.question.city}
      title={questionData.question.title}
      questionDescription={questionData.question.questionDescription}
      questionImageUrl={questionData.question.questionImageUrl}
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit}
    />
  );
};

export default QuestionPlayPage;
