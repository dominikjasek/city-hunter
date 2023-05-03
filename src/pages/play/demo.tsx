import { NextPage } from 'next';
import { QuestionTask } from '~/components/Question/QuestionTask';
import React, { useMemo, useState } from 'react';
import { trpc } from '~/utils/trpc';
import { QuestionSolutionProps, Solution } from '~/components/Solution/Solution';
import { Loader } from '~/components/common/Loader/Loader';
import { MapLocation } from '~/components/MapPicker/types';
import { MessageBox } from '~/components/common/MessageBox/MessageBox';

const DemoPlayPage: NextPage = () => {
  const startDate = useMemo(() => new Date(), []);
  const [solutionData, setSolutionData] = useState<QuestionSolutionProps | null>(null);
  const { data: demoQuestion, isLoading } = trpc.question.getRandomDemoQuestion.useQuery(undefined, {
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
            isHighlighted: true,
          },
        ],
        zoom: demoQuestion!.city.mapZoom,
        centerPoint: response.answerLocation,
      },
    });
  };

  if (isLoading) {
    return <Loader title="Načítám..." />;
  }

  if (!demoQuestion) {
    return <MessageBox message={'Bohužel nemáme k dispozici žádné demo'} type={'info'} />;
  }

  if (!solutionData) {
    return (
      <>
        {demoQuestion && (
          <QuestionTask
            questionDescription={demoQuestion.questionDescription}
            city={demoQuestion.city}
            title={demoQuestion.title}
            questionImageUrl={demoQuestion.questionImageUrl}
            isSubmitting={isSubmitting}
            onSubmit={submitAnswer}
          />
        )}
      </>
    );
  }

  return <Solution {...solutionData} />;
};

export default DemoPlayPage;

export const getStaticProps = async () => {
  return {
    props: {},
  };
};
