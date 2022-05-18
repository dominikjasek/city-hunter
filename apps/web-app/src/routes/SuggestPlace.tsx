import exifr from 'exifr'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { BaseMapPicker } from '~/components/MapPicker/BaseMapPicker'
import { MapPoint } from '~/components/MapPicker/Map.types'
import { BaseButton } from '~/components/UIBaseComponents/Button/BaseButton'
import { useFileRepository } from '~/infrastructure/File/FileRepository'
import { usePlaceRepository } from '~/infrastructure/place/PlaceRepository'

interface IFormValues {
    name: string
    location: MapPoint | null
    riddlePhotoUrl: string
    solutionPhotoUrl: string
}

export function SuggestPlace() {
  const placeRepository = usePlaceRepository()
  const fileRepository = useFileRepository()

  const [ isSubmitted, setIsSubmitted ] = useState(false)
  const [ didTryToSubmit, setDidTryToSubmit ] = useState(false)
  const [ zoomOnPointChange, setZoomOnPointChange ] = useState(false)
  const [ isFileUploadPending, setIsFileUploadPending ] = useState(false)

  const formik = useFormik({
    initialValues: {
      name: '',
      location: null,
      riddlePhotoUrl: '',
      solutionPhotoUrl: ''
    } as IFormValues,
    validateOnChange: didTryToSubmit,
    validateOnBlur: didTryToSubmit,
    onSubmit: async (values, { setSubmitting }) => {

      if (values.location === null) {
        return
      }

      setSubmitting(true)
      await placeRepository.createPlaceSuggestion(values.riddlePhotoUrl, values.name, values.location.lat.toString(), values.location.lng.toString())
      setSubmitting(false)
      setIsSubmitted(true)
    },
    validate: (values) => {
      setDidTryToSubmit(true)

      const errors = {
        name: '',
        location: '',
        riddlePhotoUrl: '',
        solutionPhotoUrl: ''
      }
      if (!values.name) {
        errors.riddlePhotoUrl = 'Fotka je povinná'
      }
      if (!values.name) {
        errors.name = 'Jméno je povinné'
      }
      if (values.location === null) {
        errors.location = 'Prosím zvolte místo na mapě'
      }
      console.log(errors, values)
      return Object.values(errors).some(Boolean) ? errors : {}
    }
  })

  if (isSubmitted) {
    return <div>Thank you for your contribution!</div>
  }

  return (
    <div>
      <h1>Nahraj vlastní fotku!</h1>
      <form onSubmit={formik.handleSubmit} className={'flex flex-col'}>
        <>
          <input type="file" accept="image/png, image/jpeg, image/heic" onChange={async (event: any) => {
            const riddlePhoto = event.target.files[ 0 ]
            if (!riddlePhoto) {
              return
            }

            try {
              exifr.gps(riddlePhoto).then((gps) => {
                formik.setFieldValue('location', { lat: gps.latitude, lng: gps.longitude })
                setZoomOnPointChange(true)
              })
            } catch (e) {
              console.log(e)
              console.log('No GPS data found')
            }

            setIsFileUploadPending(true)
            const uploadedPhoto = await fileRepository.uploadFile(riddlePhoto)
            setIsFileUploadPending(false)
            await formik.setFieldValue('riddlePhotoUrl', uploadedPhoto.url)
            formik.touched.riddlePhotoUrl = true

          }}
          />
          {isFileUploadPending && <div>Nahrávání souboru...</div>}
          {formik.errors.riddlePhotoUrl && formik.touched.riddlePhotoUrl && formik.errors.riddlePhotoUrl}

          <label>
                        Název místa
            <input
              type="name"
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              className={'text-black mx-2 my-1'}
            />
          </label>
          {formik.errors.name && formik.touched.name && formik.errors.name}

          {formik.values.riddlePhotoUrl &&
                        <img
                          className="max-w-full md:max-w-2xl mx-auto my-2"
                          src={formik.values.riddlePhotoUrl}
                          alt="riddle"
                        />}

          <BaseMapPicker
            selectedPoint={formik.values.location}
            zoomOnPointChange={zoomOnPointChange}
            onPointSelected={async (selectedMapPoint) => {
              console.log('onPointSelected', selectedMapPoint)
              await formik.setFieldValue('location', selectedMapPoint)
              setZoomOnPointChange(false)
            }}
            mapContainerStyle={{
              // height: '100vh',
              height: '500px',
              width: '100vw',
            }}
          />

          <BaseButton
            type={'submit'}
            disabled={!formik.isValid || formik.isSubmitting}
            className={'my-4 mx-auto px-8 text-xl'}
            color={'orange'}
          >
                        NAHRÁT
          </BaseButton>

          <span>{formik.isSubmitting ? 'Submitting...' : ''}</span>
        </>
      </form>
    </div>
  )
}
