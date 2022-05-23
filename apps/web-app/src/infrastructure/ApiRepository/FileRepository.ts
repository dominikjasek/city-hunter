import { IFile } from '@shared/types/File/File.types'
import { AxiosInstance } from 'axios'
import { useAxios } from '~/infrastructure/ApiRepository/axios/axios'
import { ImageCompressor } from '~/infrastructure/File/Image/ImageCompress/ImageCompressor'

export class FileRepository {
  private readonly imageCompressor: ImageCompressor

  constructor(private readonly axios: AxiosInstance) {
    this.imageCompressor = new ImageCompressor()
  }

  public async uploadFile(file: File): Promise<IFile> {
    const compressedFile = await this.imageCompressor.compressImage(file)

    const formData = new FormData()
    formData.append(
      'file',
      compressedFile,
      compressedFile.name
    )

    return (await this.axios.post('/file/upload', formData)).data
  }
}

export const useFileRepository = () => {
  const axios = useAxios()

  return new FileRepository(axios)
}