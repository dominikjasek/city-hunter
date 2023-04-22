import { Controller, useForm } from 'react-hook-form';
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
import { City } from '~/db/schema';
import { useState } from 'react';
import { MapPicker } from '~/components/MapPicker/MapPicker';

const MAX_FILE_SIZE = 5_000_000;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

const createQuestionValidationSchema = z.object({
  title: z.string(),
  questionDescription: z.string(),
  answerDescription: z.string(),
  image: z
    .any()
    .refine((file) => file, 'Fotka místa je povinná.')
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      '.jpg, .jpeg and .png files are accepted.',
    ),
  cityId: z.number(),
  location: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
});

export type CreateQuestionValidationSchema = z.infer<
  typeof createQuestionValidationSchema
>;

export const UploadImageForm = ({
  availableCities,
  onSubmit,
}: {
  availableCities: City[];
  onSubmit: (data: CreateQuestionValidationSchema) => void;
}) => {
  const [base64Image, setBase64Image] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateQuestionValidationSchema>({
    resolver: zodResolver(createQuestionValidationSchema),
    defaultValues: {
      cityId: availableCities[0]?.id,
    },
  });

  const registerCityField = register('cityId');

  function handleImageUpload(event: any) {
    const file = event.target.files[0];
    setValue('image', file);
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
        <Stack direction={'column'} sx={{ width: { xs: '100%', md: '50%' } }}>
          <Box sx={{ mb: 4, width: '100%' }}>
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
          <Box sx={{ mb: 4, width: '100%' }}>
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
          <Box sx={{ mb: 4, width: '100%' }}>
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
          <Box sx={{ mb: 4, width: '100%' }}>
            <FormControl fullWidth>
              <InputLabel color={'secondary'}>Město</InputLabel>

              <Controller
                name={registerCityField.name}
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
        <Stack sx={{ width: { xs: '100%', md: '50%' } }}>
          <Box sx={{ pl: { xs: 0, md: 3 }, mx: 'auto', minWidth: '300px' }}>
            <Stack direction={'column'}>
              {base64Image && (
                <img
                  src={base64Image}
                  alt={'Fotka místa'}
                  style={{
                    maxWidth: '100%',
                    marginBottom: '1rem',
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
                <Button
                  variant={'contained'}
                  color={'secondary'}
                  component="span"
                >
                  Vybrat fotku
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
      <Stack sx={{ width: '100%' }}>
        <MapPicker
          point={watch('location')}
          onClick={(value) => setValue('location', value)}
        />

        {errors['location']?.message && (
          <FormHelperText error>{errors['location'].message}</FormHelperText>
        )}
      </Stack>
      <Button
        variant={'contained'}
        color={'secondary'}
        type="submit"
        sx={{ mx: 'auto', my: 4, px: 6 }}
      >
        Potvrdit
      </Button>
    </form>
  );
};
