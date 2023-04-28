import { NextPage } from 'next';
import { createProxySSGHelpers } from '@trpc/react-query/ssg';
import { appRouter } from '~/server/routers/_app';
import superjson from 'superjson';
import { QuestionTask } from '~/components/Question/QuestionTask';
import React, { useMemo, useState } from 'react';
import { trpc } from '~/utils/trpc';
import { QuestionSolutionProps, Solution } from '~/components/Solution/Solution';
import { Loader } from '~/components/common/Loader/Loader';
import { Typography } from '@mui/material';
import { MapLocation } from '~/components/MapPicker/types';
import { useUser } from '@clerk/nextjs';

const DemoPlayPage: NextPage = () => {
  const startDate = useMemo(() => new Date(), []);
  const [durationInSeconds, setDurationInSeconds] = useState<number | null>(null);
  const [solutionData, setSolutionData] = useState<QuestionSolutionProps | null>(null);
  const { data: demoQuestion, isLoading } = trpc.question.getRandomDemoQuestion.useQuery();
  const { mutateAsync, isLoading: isSubmitting } = trpc.question.answerDemoQuestion.useMutation();
  const { user } = useUser();

  const submitAnswer = async (point: MapLocation) => {
    const durationInSeconds = (new Date().getTime() - startDate.getTime()) / 1000;
    setDurationInSeconds(durationInSeconds);
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
    return <Typography>Bohužel nemáme k dispozici žádní demo</Typography>;
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
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: { auth: null },
    transformer: superjson,
  });

  await ssg.question.getRandomDemoQuestion.prefetch();

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
  };
};
