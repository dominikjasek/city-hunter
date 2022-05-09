import { axiosApiInstance } from '~/infrastructure/axios/axios'

export class FileRepository {
  public async uploadFile(file: File) {
    const formData = new FormData()
    formData.append(
      'file',
      file,
      file.name
    )

    return (await axiosApiInstance.post('/file/upload', formData)).data
  }
}

export const useFileRepository = () => {
  return new FileRepository()
}