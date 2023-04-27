import { NextPage } from 'next';
import { createProxySSGHelpers } from '@trpc/react-query/ssg';
import { appRouter } from '~/server/routers/_app';
import superjson from 'superjson';
import { QuestionTask } from '~/components/Question/QuestionTask';
import React from 'react';
import { trpc } from '~/utils/trpc';

const DemoPlayPage: NextPage = () => {
  const { data: demoQuestion } = trpc.question.getRandomDemoQuestion.useQuery();
  const startDate = new Date();

  return (
    <>
      {demoQuestion && (
        <QuestionTask
          questionDescription={demoQuestion.questionDescription}
          city={demoQuestion.city}
          title={demoQuestion.title}
          questionImageUrl={demoQuestion.questionImageUrl}
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
