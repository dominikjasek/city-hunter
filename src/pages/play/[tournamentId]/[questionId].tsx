import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { trpc } from '~/utils/trpc';
import { Loader } from '~/components/common/Loader/Loader';
import { MessageBox } from '~/components/common/MessageBox/MessageBox';
import { QuestionTask } from '~/components/Question/QuestionTask';
import { MapLocation } from '~/components/MapPicker/types';
import { TRPCError } from '@trpc/server';
import { useState } from 'react';
import { formatTime } from '~/utils/formatter/dateFormatter';

export const QuestionPlayPage: NextPage = () => {
  const { query } = useRouter();
  const { questionId } = query;
  const [pageState, setPageState] = useState<'waiting_for_submit' | 'answered' | 'expired'>('waiting_for_submit');
  const { data: questionData, isLoading } = trpc.question.getQuestion.useQuery(
    { id: Number(questionId) },
    { enabled: Boolean(questionId) },
  );
  const { mutateAsync, isLoading: isSubmitting } = trpc.question.answerQuestion.useMutation();

  const handleSubmit = async (location: MapLocation) => {
    const result = await mutateAsync({ questionId: Number(questionId), answer: location }).catch((error: TRPCError) => {
      if (error.message === 'Question already finished') {
        setPageState('expired');
      }
    });
    if (result?.success) {
      setPageState('answered');
    }
  };

  if (isLoading) {
    return <Loader title={'Načítání...'} />;
  }

  if (!questionData) {
    return <MessageBox type={'warning'} message={'Něco se pokazilo, Data k otázce nebyly nalezeny.'} />;
  }

  if (questionData.status === 'answered') {
    return <MessageBox type={'success'} message={`Už jste odpověděli`} />;
  }

  if (questionData.status === 'finished' || pageState === 'expired') {
    return <MessageBox type={'info'} message={'Kolo už je ukonečené. Bohužel jste nestihli odpovědět.'} />;
  }

  if (questionData.status === 'not_started') {
    return <MessageBox type={'info'} message={'Kolo ještě nezačalo'} />;
  }

  const question = questionData.question;
  if (!question) {
    return <MessageBox type={'warning'} message={'Otázka nebyla nalezena. Kontaktujte administrátora.'} />;
  }

  if (pageState === 'answered') {
    return (
      <MessageBox
        type={'success'}
        message={`Vaše odpověď byla uložena. Výsledky budou zveřejněny v ${formatTime(question.endDate)}`}
      />
    );
  }

  return (
    <QuestionTask
      city={question.city}
      title={question.title}
      questionDescription={question.questionDescription}
      questionImageUrl={question.questionImageUrl}
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit}
    />
  );
};

export default QuestionPlayPage;
