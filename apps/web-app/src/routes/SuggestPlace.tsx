import exifr from 'exifr'
import { Formik } from 'formik'
import React, { useState } from 'react'
import { BaseMapPicker } from '~/components/MapPicker/BaseMapPicker'
import { BaseButton } from '~/components/UIBaseComponents/Button/BaseButton'
import { useFileRepository } from '~/infrastructure/File/FileRepository'
import { usePlaceRepository } from '~/infrastructure/place/PlaceRepository'

interface IFormValues {
    name: string
    lng: number
    lat: number
    riddlePhotoUrl: string
    solutionPhotoUrl: string
}

export function SuggestPlace() {
  const placeRepository = usePlaceRepository()
  const fileRepository = useFileRepository()

  const [ isSubmitted, setIsSubmitted ] = useState(false)
  const [ zoomOnPointChange, setZoomOnPointChange ] = useState(false)
  const [ isFileUploadPending, setIsFileUploadPending ] = useState(false)

  if (isSubmitted) {
    return <div>Thank you for your contribution!</div>
  }

  return (
    <div>
      <h1>Nahraj vlastní fotku!</h1>
      <div>
        <Formik
          initialValues={{
            name: '',
            lng: 0,
            lat: 0,
            riddlePhotoUrl: '',
            solutionPhotoUrl: ''
          } as IFormValues}
          validate={(values) => {
            const errors = {
              name: '',
              lng: '',
              lat: '',
              riddlePhotoUrl: '',
              solutionPhotoUrl: ''
            }
            if (!values.name) {
              errors.name = 'Jméno je povinné'
            }
            if (!values.lng) {
              errors.lng = 'Prosím zvolte lng na mapě'
            }
            if (!values.lat) {
              errors.lat = 'Prosím zvolte lat na mapě'
            }
            return Object.values(errors).some(Boolean) ? errors : {}
          }}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true)
            await placeRepository.createPlaceSuggestion(values.riddlePhotoUrl, values.name, values.lat.toString(), values.lng.toString())
            setSubmitting(false)
            setIsSubmitted(true)
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            isValid,
            setFieldValue
          }) => (
            <form onSubmit={handleSubmit}>
              <>
                <input type="file" accept="image/png, image/jpeg, image/heic"
                  onChange={async (event: any) => {
                    const riddlePhoto = event.target.files[ 0 ]
                    if (!riddlePhoto) {
                      return
                    }

                    exifr.gps(riddlePhoto).then((gps) => {
                      setFieldValue('lat', gps.latitude)
                      setFieldValue('lng', gps.longitude)
                      setZoomOnPointChange(true)
                    })

                    setIsFileUploadPending(true)
                    const uploadedPhoto = await fileRepository.uploadFile(riddlePhoto)
                    setIsFileUploadPending(false)
                    setFieldValue('riddlePhotoUrl', uploadedPhoto.url)
                    touched.riddlePhotoUrl = true

                  }}/>
                {isFileUploadPending && <div>Nahrávání souboru...</div>}
                {errors.riddlePhotoUrl && touched.riddlePhotoUrl && errors.riddlePhotoUrl}

                <div>
                  <label>
                                        Název místa
                    <input
                      type="name"
                      name="name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                      className={'text-black mx-2 my-1'}
                    />
                  </label>
                </div>
                {errors.name && touched.name && errors.name}

                {values.riddlePhotoUrl &&
                                    <img
                                      className="max-w-full md:max-w-2xl mx-auto my-2"
                                      src={values.riddlePhotoUrl}
                                      alt="riddle"
                                    />}

                <BaseMapPicker
                  selectedPoint={{ lat: Number(values.lat), lng: Number(values.lng) }}
                  zoomOnPointChange={zoomOnPointChange}
                  onPointSelected={({ lat, lng }) => {
                    setFieldValue('lat', lat)
                    setFieldValue('lng', lng)
                    setZoomOnPointChange(false)
                  }}
                  mapContainerStyle={{
                    height: '100vh',
                    width: '100vw',
                  }}
                />

                <BaseButton
                  type={'submit'}
                  disabled={!isValid || isSubmitting}
                  className={'my-3'}
                  color={'orange'}
                >
                                    NAHRÁT
                </BaseButton>

                <span>{isSubmitting ? 'Submitting...' : ''}</span>
              </>
            </form>
          )}
        </Formik>
      </div>
    </div>
  )
}
