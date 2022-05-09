import { Formik } from 'formik'
import React from 'react'
import { usePlaceRepository } from '~/infrastructure/place/PlaceRepository'

interface IFormValues {
    name: string
    lng: string
    lat: string
    riddlePhoto: File | null
    answerPhoto: File | null
}

export const Contribute = () => {
  const placeRepository = usePlaceRepository()

  // const [ state ] = useState({
  //   selectedFile: null as File | null,
  // })

  // const [ email, setEmail ] = useState('')

  // const onFileChange = (event: any) => {
  //   // Update the state
  //   setState({ selectedFile: event.target.files[ 0 ] })
  // }

  // const uploadFile = async () => {
  //   // Upload the file
  //   if (state.selectedFile) {
  //     const res = await fileRepository.uploadFile(state.selectedFile)
  //     console.log(res)
  //   }
  // }

  // const uploadPlaceSuggestion = async (values: IFormValues, { setSubmitting }: FormikHelpers<IFormValues>) => {
  //   console.log('uploadPlaceSuggestion', values)
  //   setSubmitting(true)
  //   await uploadFile()
  //   setSubmitting(false)
  // }

  return (
    <div>
      <h1>Nahrej vlastní fotku!</h1>
      <div>
        <Formik
          initialValues={{
            name: '',
            lng: '',
            lat: '',
            riddlePhoto: null,
            answerPhoto: null
          } as IFormValues}
          validate={(values) => {
            const errors = {
              name: '',
              lng: '',
              lat: '',
              riddlePhoto: '',
              answerPhoto: ''
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
            console.log('uploadPlaceSuggestion', values)
            setSubmitting(true)
            await placeRepository.createPlaceSuggestion(values.riddlePhoto!, values.name, values.lat, values.lng)
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
                  onChange={(event: any) => {
                    // Update the state
                    // setState({ selectedFile: event.target.files[ 0 ] })
                    values.riddlePhoto = event.target.files[ 0 ]
                    touched.riddlePhoto = true
                  }}/>
                {errors.riddlePhoto && touched.riddlePhoto && errors.riddlePhoto}
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