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

export function Contribute() {
  const placeRepository = usePlaceRepository()
  const fileRepository = useFileRepository()

  const [ isSubmitted, setIsSubmitted ] = useState(false)
  const [ zoomOnPointChange, setZoomOnPointChange ] = useState(false)

  if (isSubmitted) {
    return <div>Thank you for your contribution!</div>
  }

  return (
    <div>
      <h1>Nahrej vlastní fotku!</h1>
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
                      console.log('GPS:', gps)
                      setFieldValue('lat', gps.latitude)
                      setFieldValue('lng', gps.longitude)
                      setZoomOnPointChange(true)
                    })

                    const uploadedPhoto = await fileRepository.uploadFile(riddlePhoto)
                    values.riddlePhotoUrl = uploadedPhoto.url
                    touched.riddlePhotoUrl = true

                  }}/>
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

                <div>
                  <label>
                                        Lng:
                    <input
                      type="lng"
                      name="lng"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.lng}
                      className={'text-black mx-2 my-1'}
                    />
                  </label>
                </div>
                {errors.lng && touched.lng && errors.lng}

                <div>
                  <label>
                                        Lat:
                    <input
                      type="lat"
                      name="lat"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.lat}
                      className={'text-black mx-2 my-1'}
                    />
                  </label>
                </div>
                {errors.lat && touched.lat && errors.lat}

                <BaseMapPicker
                  selectedPoint={{ lat: values.lat, lng: values.lng }}
                  zoomOnPointChange={zoomOnPointChange}
                  onPointSelected={({ lat, lng }) => {
                    setFieldValue('lat', lat)
                    setFieldValue('lng', lng)
                    setZoomOnPointChange(false)
                  }}
                />

                <BaseButton
                  type={'submit'}
                  disabled={!isValid || isSubmitting}
                  className={'my-3'}
                  color={'orange'}
                  onClick={() => console.log('ahoj')}>
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
