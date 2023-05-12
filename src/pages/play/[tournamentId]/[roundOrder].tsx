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
import RefreshIcon from '@mui/icons-material/Refresh';
import { createDurationString } from '~/utils/ranking/createDurationString';
import LoadingButton from '@mui/lab/LoadingButton';

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
      await utils.question.invalidate();
    }
  };

  const now = new Date();

  if (isQuestionLoading) {
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
        <MessageBox
          type={'info'}
          message={`Kolo začne za ${createDurationString(
            (questionData.question!.startDate!.getTime() - now.getTime()) / 1000,
            { format: 'minutes and seconds' },
          )}. Pro aktualizaci klepněte na tlačítko Aktualizovat.`}
        />

        <LoadingButton
          variant={'contained'}
          color={'primary'}
          startIcon={<RefreshIcon />}
          onClick={() => refetch()}
          sx={{ mt: 4 }}
          loading={isQuestionFetching}
        >
          Aktualizovat
        </LoadingButton>
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
