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

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

const validationSchema = z.object({
  title: z.string(),
  questionDescription: z.string(),
  answerDescription: z.string(),
  image: z
    .any()
    .refine((files) => files?.length == 1, 'Image is required.')
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 5MB.`,
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      '.jpg, .jpeg, .png and .webp files are accepted.',
    ),
  cityId: z.number(),
  x: z.string(),
  y: z.string(),
});

type ValidationSchema = z.infer<typeof validationSchema>;

export const UploadImageForm = ({
  availableCities,
}: {
  availableCities: City[];
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<ValidationSchema> = (data) => console.log(data);

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
          <Box sx={{ mb: 4, width: '300px' }}>
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
          <Box sx={{ mb: 4, width: '300px' }}>
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
          <Box sx={{ mb: 4, width: '300px' }}>
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
          <Box sx={{ mb: 4, width: '300px' }}>
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

        <Stack direction={'column'} sx={{ width: '100%', px: 2 }}>
          <MapPicker />
        </Stack>
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
