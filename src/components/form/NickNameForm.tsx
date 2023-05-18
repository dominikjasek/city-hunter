import React, { FC, useEffect } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Stack, TextField } from '@mui/material';

const userProfileValidationSchema = z.object({
  nickName: z.string().min(3, 'Přezdívka musí mít alespoň 3 znaky').max(20, 'Přezdívka může mít maximálně 20 znaků'),
});
type UserProfileValidationSchema = z.infer<typeof userProfileValidationSchema>;

export const NickNameForm: FC<{
  nickName: string;
  onSubmit: (value: UserProfileValidationSchema) => void;
  isSubmitting: boolean;
}> = ({ nickName, onSubmit, isSubmitting }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UserProfileValidationSchema>({
    resolver: zodResolver(userProfileValidationSchema),
    defaultValues: {
      nickName,
    },
  });

  useEffect(() => {
    setValue('nickName', nickName);
  }, [nickName]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack direction={'column'} mx={'auto'} maxWidth={{ xs: 300, md: 500 }}>
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

        <Button variant={'contained'} color={'secondary'} type="submit" sx={{ my: 2, px: 6 }} disabled={isSubmitting}>
          Uložit
        </Button>
      </Stack>
    </form>
  );
};
