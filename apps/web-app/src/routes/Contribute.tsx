import { Formik } from 'formik'
import React from 'react'
import { useFileRepository } from '~/infrastructure/File/FileRepository'
import { usePlaceRepository } from '~/infrastructure/place/PlaceRepository'

interface IFormValues {
    name: string
    lng: string
    lat: string
    riddlePhotoUrl: string
    solutionPhotoUrl: string
}

export function Contribute() {
  const placeRepository = usePlaceRepository()
  const fileRepository = useFileRepository()

  return (
    <div>
      <h1>Nahrej vlastní fotku!</h1>
      <div>
        <Formik
          initialValues={{
            name: '',
            lng: '',
            lat: '',
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
            await placeRepository.createPlaceSuggestion(values.riddlePhotoUrl, values.name, values.lat, values.lng)
            setSubmitting(false)
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
            isValid
          }) => (
            <form onSubmit={handleSubmit}>
              <>
                <input type="file" accept="image/png, image/jpeg, image/heic"
                  onChange={async (event: any) => {
                    // Update the state
                    const riddlePhoto = event.target.files[ 0 ]
                    if (!riddlePhoto) {
                      return
                    }
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

                <button type="submit" disabled={!isValid || isSubmitting}>
                                    Nahrát
                </button>
              </>
            </form>
          )}
        </Formik>
      </div>
    </div>
  )
}