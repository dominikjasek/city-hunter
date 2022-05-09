import React, { useState } from 'react'
import { useFileRepository } from '~/infrastructure/file/FileRepository'

export const Contribute = () => {
  const fileRepository = useFileRepository()

  const [ state, setState ] = useState({
    selectedFile: null as File | null,
  })

  const onFileChange = (event: any) => {
    // Update the state
    setState({ selectedFile: event.target.files[ 0 ] })
  }

  const uploadFile = async () => {
    // Upload the file
    if (state.selectedFile) {
      const res = await fileRepository.uploadFile(state.selectedFile)
      console.log(res)
    }
  }

  return (
    <div>
            Nahrej vlastní fotku!
      <div>
        <input type="file" accept="image/png, image/jpeg, image/heic" onChange={onFileChange}/>
        <div>
          <button onClick={uploadFile}>
                        Nahrát
          </button>
        </div>
      </div>
    </div>
  )
}