import { NextPage } from 'next';
import { createProxySSGHelpers } from '@trpc/react-query/ssg';
import { appRouter } from '~/server/routers/_app';
import superjson from 'superjson';
import { QuestionTask } from '~/components/Question/QuestionTask';
import React from 'react';
import { trpc } from '~/utils/trpc';
import { MapLocation } from '~/components/MapPicker/MapPicker';

const DemoPlayPage: NextPage = () => {
  const startDate = new Date();
  const { data: demoQuestion } = trpc.question.getRandomDemoQuestion.useQuery();
  const { mutateAsync } = trpc.question.answerDemoQuestion.useMutation();

  const submitAnswer = async (point: MapLocation) => {
    const { score } = await mutateAsync({
      answer: point,
      durationInSeconds: (new Date().getTime() - startDate.getTime()) / 1000,
      questionId: demoQuestion!.id,
    });
    console.log('score', score);
  };

  return (
    <>
      {demoQuestion && (
        <QuestionTask
          questionDescription={demoQuestion.questionDescription}
          city={demoQuestion.city}
          title={demoQuestion.title}
          questionImageUrl={demoQuestion.questionImageUrl}
          onSubmit={submitAnswer}
        />
      )}
    </>
  );
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
