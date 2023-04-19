import React from 'react';
import { GetStaticPropsContext, NextPage } from 'next';
import { UploadImageForm } from '~/components/form/UploadImageForm';
import { trpc } from '~/utils/trpc';
import { Loader } from '~/components/common/Loader/Loader';
import { MessageBox } from '~/components/common/MessageBox/MessageBox';
import { createProxySSGHelpers } from '@trpc/react-query/ssg';
import { appRouter } from '~/server/routers/_app';
import superjson from 'superjson';

export const Contribute: NextPage = () => {
  const { data: availableCities, isLoading } = trpc.city.list.useQuery();

  if (isLoading) {
    return <Loader title={'Načítám dostupná města'} />;
  }
  if (!availableCities) {
    return (
      <MessageBox
        message={'Nepodařilo se načíst dostupná města'}
        type={'warning'}
      />
    );
  }

  return (
    <div>
      <UploadImageForm availableCities={availableCities} />
    </div>
  );
};

export default Contribute;

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: { auth: null },
    transformer: superjson, // optional - adds superjson serializatio
  });

  await ssg.city.list.prefetch();

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
  };
};
