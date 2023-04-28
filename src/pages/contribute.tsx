import React, { useCallback, useState } from 'react';
import { NextPage } from 'next';
import { CreateQuestionValidationSchema, UploadQuestionForm } from '~/components/form/UploadQuestionForm';
import { trpc } from '~/utils/trpc';
import { Loader } from '~/components/common/Loader/Loader';
import { MessageBox } from '~/components/common/MessageBox/MessageBox';
import { createProxySSGHelpers } from '@trpc/react-query/ssg';
import { appRouter } from '~/server/routers/_app';
import superjson from 'superjson';
import { useImageUpload } from '~/hooks/use-image-upload';

export const Contribute: NextPage = () => {
  const { uploadImage } = useImageUpload();
  const { data: availableCities, isLoading } = trpc.city.getAll.useQuery();
  const { mutateAsync, isSuccess, isError, error } = trpc.question.create.useMutation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createQuestion = useCallback(
    async (data: CreateQuestionValidationSchema) => {
      setIsSubmitting(true);

      const uploadQuestionImagePromise = uploadImage(data.questionImage);
      const uploadAnswerImagesPromises = (data.answerImages as File[]).map((answerImage: File) =>
        uploadImage(answerImage),
      );
      const [questionImageUrl, answerImagesUrl] = await Promise.all([
        uploadQuestionImagePromise,
        Promise.all(uploadAnswerImagesPromises),
      ]);

      await mutateAsync({
        ...data,
        questionImageUrl: questionImageUrl,
        answerImagesUrl: answerImagesUrl,
      });
      setIsSubmitting(false);
    },
    [mutateAsync],
  );

  if (isLoading) {
    return <Loader title={'Načítám dostupná města'} />;
  }

  if (!availableCities) {
    return <MessageBox message={'Nepodařilo se načíst dostupná města'} type={'warning'} />;
  }

  if (isSuccess) {
    return <MessageBox message={'Místo bylo nahráno!'} type={'success'} />;
  }

  if (isError) {
    return <MessageBox message={`Nepodařilo se nahrát místo: ${error.message}`} type={'error'} />;
  }

  if (isSubmitting) {
    return <Loader title={'Nahrávám místo'} />;
  }

  return (
    <>
      <UploadQuestionForm availableCities={availableCities.cities} onSubmit={createQuestion} />
    </>
  );
};

export default Contribute;

export const getStaticProps = async () => {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: { auth: null },
    transformer: superjson,
  });

  await ssg.city.getAll.prefetch();

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
  };
};
