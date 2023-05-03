import React, { useEffect } from 'react';
import { NextPage } from 'next';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { trpc } from '~/utils/trpc';
import { Loader } from '~/components/common/Loader/Loader';
import { MessageBox } from '~/components/common/MessageBox/MessageBox';

const userProfileValidationSchema = z.object({
  nickName: z.string().min(3, 'Přezdívka musí mít alespoň 3 znaky').max(20, 'Přezdívka může mít maximálně 20 znaků'),
});
type UserProfileValidationSchema = z.infer<typeof userProfileValidationSchema>;

const UserPage: NextPage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UserProfileValidationSchema>({
    resolver: zodResolver(userProfileValidationSchema),
  });

  const { data: currentNickName, isLoading: isNickNameLoading } = trpc.auth.getNickName.useQuery();
  useEffect(() => {
    if (currentNickName) {
      setValue('nickName', currentNickName);
    }
  }, [currentNickName]);

  const {
    mutateAsync,
    isLoading: isSubmitting,
    isSuccess: isNickNameSuccessfullyChanged,
  } = trpc.auth.updateNickName.useMutation();

  const utils = trpc.useContext();

  const onFormSubmit = async (data: UserProfileValidationSchema) => {
    await mutateAsync(data);
    await utils.invalidate(undefined, { queryKey: ['auth.getNickName'] });
  };

  if (isNickNameLoading) {
    return <Loader title={'Načítám vaše data...'} />;
  }

  return (
    <Box textAlign={'left'}>
      <Typography variant="h5" my={3}>
        Váš účet
      </Typography>
      {isNickNameSuccessfullyChanged ? (
        <MessageBox
          message={'Přezdívka byla úspěšně změněna. Změna přezdívky se v žebříčkách projeví do 1 minuty.'}
          type={'success'}
        />
      ) : (
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <Stack direction={'column'} maxWidth={{ xs: 300, md: 500 }}>
            <TextField
              fullWidth
              label={'Přezdívka zobrazená v žebříčku'}
              variant="filled"
              color={'secondary'}
              required
              error={!!errors['nickName']}
              helperText={errors['nickName'] ? errors['nickName'].message : ''}
              {...register('nickName')}
            />

            <Button
              variant={'contained'}
              color={'secondary'}
              type="submit"
              sx={{ my: 4, px: 6 }}
              disabled={isSubmitting}
            >
              Uložit
            </Button>
          </Stack>
        </form>
      )}
    </Box>
  );
};

export default UserPage;

export async function getStaticProps() {
  return {
    props: {
      currentNickName: 'test',
    },
  };
}
