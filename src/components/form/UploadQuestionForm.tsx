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
import { ChangeEvent, useState } from 'react';
import { MapPicker } from '~/components/MapPicker/MapPicker';

const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

const createQuestionValidationSchema = z.object({
  title: z.string(),
  questionDescription: z.string(),
  answerDescription: z.string(),
  questionImage: z
    .any()
    .refine((file) => file, 'Fotka místa je povinná.')
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), '.jpg, .jpeg and .png files are accepted.'),
  answerImages: z
    .any()
    .refine((files: File[]) => files.length > 0, 'Fotka místa je povinná.')
    .refine(
      (files: File[]) => files.every((file) => ACCEPTED_IMAGE_TYPES.includes(file.type)),
      '.jpg, .jpeg and .png files are accepted.',
    ),
  cityId: z.number(),
  location: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
});

export type CreateQuestionValidationSchema = z.infer<typeof createQuestionValidationSchema>;

export const UploadQuestionForm = ({
  availableCities,
  onSubmit,
}: {
  availableCities: City[];
  onSubmit: (data: CreateQuestionValidationSchema) => void;
}) => {
  const [questionImageUrl, setQuestionImageUrl] = useState<string | null>(null);
  const [answerImagesUrl, setAnswerImagesUrl] = useState<string[] | null>(null);

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

  const selectedCity = availableCities.find((city) => city.id === watch('cityId'));
  if (!selectedCity) {
    throw new Error('Selected city not found');
  }

  const registerCityField = register('cityId');

  const handleQuestionImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    setValue('questionImage', file, { shouldValidate: true });
    setQuestionImageUrl(URL.createObjectURL(file));
  };

  const handleAnswerImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (!fileList) {
      return;
    }
    const files = [...fileList];
    setValue('answerImages', files, { shouldValidate: true });
    setAnswerImagesUrl(files.map((file) => URL.createObjectURL(file)));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography textAlign={'center'} variant={'h4'} sx={{ mb: 2 }}>
        Nahrát nové místo
      </Typography>
      <Stack direction={{ xs: 'column', md: 'row' }} justifyContent={'space-around'} sx={{ mb: 4 }}>
        <Stack direction={'column'} sx={{ width: '100%' }}>
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
              helperText={errors['questionDescription'] ? errors['questionDescription'].message : ''}
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
              helperText={errors['answerDescription'] ? errors['answerDescription'].message : ''}
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
            {errors['cityId']?.message && <FormHelperText error>{errors['cityId'].message}</FormHelperText>}
          </Box>
        </Stack>
      </Stack>
      <Stack sx={{ width: '100%', mb: 4 }} direction={{ xs: 'column', md: 'row' }}>
        <Box
          flexGrow={1}
          sx={{
            pl: { xs: 0, md: 3 },
            mb: 2,
            width: { xs: '100%', md: '50%' },
          }}
        >
          <Stack direction={'column'}>
            <Typography variant={'h6'} textAlign={'center'}>
              Fotka pro zadání
            </Typography>
            {questionImageUrl && (
              <img
                src={questionImageUrl}
                alt={'Fotka místa'}
                style={{
                  maxWidth: '100%',
                  marginBottom: '1rem',
                }}
              />
            )}
            <input
              type="file"
              id={'questionImageInput'}
              accept={ACCEPTED_IMAGE_TYPES.join(', ')}
              {...register('questionImage')}
              hidden
              onChange={handleQuestionImageUpload}
            />
            <label htmlFor="questionImageInput">
              <Button variant={'contained'} color={'secondary'} component="span">
                Vybrat fotku
              </Button>
            </label>

            {errors['questionImage']?.message && (
              <FormHelperText error>{errors['questionImage'].message.toString()}</FormHelperText>
            )}
          </Stack>
        </Box>

        <Box flexGrow={1} sx={{ pl: { xs: 0, md: 3 }, mb: 2, width: { xs: '100%', md: '50%' } }}>
          <Stack direction={'column'}>
            <Typography variant={'h6'} textAlign={'center'}>
              Fotky pro zobrazení po zveřejnění výsledků
            </Typography>
            {answerImagesUrl &&
              answerImagesUrl.map((answerImageUrl) => (
                <img
                  key={answerImageUrl}
                  src={answerImageUrl}
                  alt={'Fotka místa'}
                  style={{
                    maxWidth: '100%',
                    marginBottom: '1rem',
                  }}
                />
              ))}
            <input
              type="file"
              multiple
              id={'answerImagesInput'}
              accept={ACCEPTED_IMAGE_TYPES.join(', ')}
              {...register('answerImages')}
              hidden
              onChange={handleAnswerImageUpload}
            />
            <label htmlFor="answerImagesInput">
              <Button variant={'contained'} color={'secondary'} component="span">
                Vybrat fotku
              </Button>
            </label>
            {errors['answerImages']?.message && (
              <FormHelperText error>{errors['answerImages'].message.toString()}</FormHelperText>
            )}
          </Stack>
        </Box>
      </Stack>

      <Stack
        sx={{
          width: '100%',
          height: 600,
        }}
      >
        <MapPicker
          centerPoint={selectedCity.centerPoint}
          zoom={selectedCity.mapZoom}
          point={watch('location')}
          onClick={(value) => setValue('location', value, { shouldValidate: true })}
        />

        {errors['location']?.message && <FormHelperText error>{errors['location'].message}</FormHelperText>}
      </Stack>
      <Button variant={'contained'} color={'secondary'} type="submit" sx={{ mx: 'auto', my: 4, px: 6 }}>
        Potvrdit
      </Button>
    </form>
  );
};
