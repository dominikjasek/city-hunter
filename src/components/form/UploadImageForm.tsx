import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { MapPicker } from '~/components/MapPicker/MapPicker';
import { City } from '~/db/schema';
import { useState } from 'react';

const MAX_FILE_SIZE = 5_000_000;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

const validationSchema = z.object({
  title: z.string(),
  questionDescription: z.string(),
  answerDescription: z.string(),
  image: z
    .any()
    .refine((files) => files?.length == 1, 'Fotka místa je povinná.')
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 5MB.`,
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      '.jpg, .jpeg and .png files are accepted.',
    ),
  cityId: z.number(),
  location: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
});

type ValidationSchema = z.infer<typeof validationSchema>;

export const UploadImageForm = ({
  availableCities,
}: {
  availableCities: City[];
}) => {
  const [base64Image, setBase64Image] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      cityId: availableCities[0]?.id,
    },
  });

  const onSubmit: SubmitHandler<ValidationSchema> = (data) => console.log(data);

  function handleImageUpload(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (upload) => {
      if (upload.target?.result) {
        setBase64Image(upload.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography textAlign={'center'} variant={'h4'} sx={{ mb: 2 }}>
        Nahrát nové místo
      </Typography>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        justifyContent={'space-around'}
        sx={{ mb: 4 }}
      >
        <Stack direction={'column'}>
          <Box sx={{ mb: 4, width: { xs: '100%', md: '300px' } }}>
            <TextField
              fullWidth
              label={'Název místa'}
              variant="filled"
              color={'secondary'}
              required
              error={!!errors['title']}
              helperText={errors['title'] ? errors['title'].message : ''}
              {...register('title')}
            />
          </Box>
          <Box sx={{ mb: 4, width: { xs: '100%', md: '300px' } }}>
            <TextField
              fullWidth
              label={'Popis místa před odpovědí'}
              multiline
              variant="filled"
              color={'secondary'}
              required
              error={!!errors['questionDescription']}
              helperText={
                errors['questionDescription']
                  ? errors['questionDescription'].message
                  : ''
              }
              {...register('questionDescription')}
            />
          </Box>
          <Box sx={{ mb: 4, width: { xs: '100%', md: '300px' } }}>
            <TextField
              fullWidth
              label={'Popis místa po odpovědí'}
              multiline
              variant="filled"
              color={'secondary'}
              required
              error={!!errors['answerDescription']}
              helperText={
                errors['answerDescription']
                  ? errors['answerDescription'].message
                  : ''
              }
              {...register('answerDescription')}
            />
          </Box>
          <Box sx={{ mb: 4, width: { xs: '100%', md: '300px' } }}>
            <FormControl fullWidth>
              <InputLabel color={'secondary'}>Město</InputLabel>

              <Controller
                {...register('cityId')}
                control={control}
                render={({ field }) => (
                  <Select variant={'filled'} color={'secondary'} {...field}>
                    {availableCities.map((option) => (
                      <MenuItem key={option.name} value={option.id}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
            {errors['cityId']?.message && (
              <FormHelperText error>{errors['cityId'].message}</FormHelperText>
            )}
          </Box>
        </Stack>
        <Stack>
          <Box sx={{ pl: { xs: 0, md: 3 }, mx: 'auto' }}>
            <Stack direction={'column'}>
              {base64Image && (
                <img
                  src={base64Image}
                  alt={'Fotka místa'}
                  width={'100%'}
                  style={{
                    maxHeight: '400px',
                    width: 'fit-content',
                  }}
                />
              )}
              <input
                type="file"
                id={'fileInput'}
                accept={ACCEPTED_IMAGE_TYPES.join(', ')}
                {...register('image')}
                hidden
                onChange={handleImageUpload}
              />
              <label htmlFor="fileInput">
                <Button color={'secondary'} component="span">
                  Nahrát fotku
                </Button>
              </label>

              {errors['image']?.message && (
                <FormHelperText error>
                  {errors['image'].message.toString()}
                </FormHelperText>
              )}
            </Stack>
          </Box>
        </Stack>
      </Stack>
      <Stack sx={{ width: '100%', pl: { xs: 0, md: 3 } }}>
        <MapPicker
          point={watch('location')}
          onClick={(e) => setValue('location', e)}
        />
      </Stack>
      <Button
        variant={'contained'}
        color={'secondary'}
        type="submit"
        sx={{ mx: 'auto' }}
      >
        Potvrdit
      </Button>
    </form>
  );
};
