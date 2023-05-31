import { NextPage } from 'next';
import { QuestionTask } from '~/components/Question/QuestionTask';
import React, { useMemo, useState } from 'react';
import { trpc } from '~/utils/trpc';
import { DemoSolution, QuestionSolutionProps } from '~/components/Demo/DemoSolution';
import { Loader } from '~/components/common/Loader/Loader';
import { MapLocation } from '~/components/MapPicker/types';
import { MessageBox } from '~/components/common/MessageBox/MessageBox';
import { Button } from '@mui/material';
import Cached from '@mui/icons-material/Cached';

const NextDemoQuestionButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <Button sx={{ my: 2 }} onClick={onClick} variant={'outlined'} color={'secondary'} startIcon={<Cached />}>
      Další otázka
    </Button>
  );
};

const DemoPlayPage: NextPage = () => {
  const startDate = useMemo(() => new Date(), []);
  const [solutionData, setSolutionData] = useState<QuestionSolutionProps | null>(null);
  const {
    data: demoQuestion,
    isFetching,
    refetch: refetchDemoQuestion,
  } = trpc.question.getRandomDemoQuestion.useQuery(undefined, {
    refetchOnMount: true,
  });
  const { mutateAsync, isLoading: isSubmitting } = trpc.question.answerDemoQuestion.useMutation();

  const submitAnswer = async (point: MapLocation) => {
    const durationInSeconds = (new Date().getTime() - startDate.getTime()) / 1000;
    const response = await mutateAsync({
      answer: point,
      durationInSeconds: durationInSeconds,
      questionId: demoQuestion!.id,
    });
    setSolutionData({
      name: demoQuestion!.title,
      score: response.score,
      distance: Math.floor(response.distance),
      durationInSeconds: durationInSeconds,
      answerDescription: response.answerDescription,
      images: [demoQuestion!.questionImageUrl, ...response.answerImagesUrl],
      map: {
        locations: [
          {
            type: 'solution',
            location: response.correctLocation,
          },
          {
            type: 'user-answer',
            location: response.answerLocation,
            isMyAnswer: true,
          },
        ],
        zoom: demoQuestion!.city.mapZoom,
        centerPoint: response.answerLocation,
      },
    });
  };

  if (isFetching) {
    return <Loader title="Načítám..." />;
  }

  if (!demoQuestion) {
    return <MessageBox message={'Bohužel nemáme k dispozici žádné demo'} type={'info'} />;
  }

  if (!solutionData) {
    return (
      <>
        {demoQuestion && (
          <>
            <QuestionTask
              questionDescription={demoQuestion.questionDescription}
              city={demoQuestion.city}
              title={demoQuestion.title}
              questionImageUrl={demoQuestion.questionImageUrl}
              isSubmitting={isSubmitting}
              onSubmit={submitAnswer}
            />
            <NextDemoQuestionButton
              onClick={() => {
                setSolutionData(null);
                refetchDemoQuestion();
              }}
            />
          </>
        )}
      </>
    );
  }

  return (
    <>
      <DemoSolution {...solutionData} />
      <NextDemoQuestionButton
        onClick={() => {
          setSolutionData(null);
          refetchDemoQuestion();
        }}
      />
    </>
  );
};

export default DemoPlayPage;

export const getStaticProps = async () => {
  return {
    props: {},
  };
};
