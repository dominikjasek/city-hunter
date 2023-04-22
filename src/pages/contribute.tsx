import React, { useCallback, useState } from 'react';
import { GetStaticPropsContext, NextPage } from 'next';
import {
  CreateQuestionValidationSchema,
  UploadImageForm,
} from '~/components/form/UploadImageForm';
import { trpc } from '~/utils/trpc';
import { Loader } from '~/components/common/Loader/Loader';
import { MessageBox } from '~/components/common/MessageBox/MessageBox';
import { createProxySSGHelpers } from '@trpc/react-query/ssg';
import { appRouter } from '~/server/routers/_app';
import superjson from 'superjson';

export const Contribute: NextPage = () => {
  const { data: availableCities, isLoading } = trpc.city.list.useQuery();
  const { mutateAsync, isSuccess } = trpc.question.create.useMutation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createQuestion = useCallback(
    async (data: CreateQuestionValidationSchema) => {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append('file', data.image);
      formData.append('upload_preset', 'egu3lgzw'); // value got from here https://console.cloudinary.com/console/c-3b11fb731fc6e5a47cd099ae611db4/getting-started

      const cloudinaryResponse = await fetch(
        `https://api.cloudinary.com/v1_1/dwdwjz5kb/upload`, // value got from here https://console.cloudinary.com/settings/c-3b11fb731fc6e5a47cd099ae611db4/upload
        {
          method: 'POST',
          body: formData,
        },
      );
      const cloudinaryData = await cloudinaryResponse.json();
      const imageUrl = cloudinaryData.url.replace(
        '/upload/',
        '/upload/c_fill/c_scale,w_auto/dpr_auto/',
      );

      await mutateAsync({
        ...data,
        imageUrl,
      });
      setIsSubmitting(false);
    },
    [mutateAsync],
  );

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

  if (isSuccess) {
    return <MessageBox message={'Místo bylo nahráno!'} type={'success'} />;
  }

  if (isSubmitting) {
    return <Loader title={'Nahrávám místo'} />;
  }

  return (
    <>
      <UploadImageForm
        availableCities={availableCities.cities}
        onSubmit={createQuestion}
      />
    </>
  );
};

export default Contribute;

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: { auth: null },
    transformer: superjson,
  });

  await ssg.city.list.prefetch();

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
  };
};
