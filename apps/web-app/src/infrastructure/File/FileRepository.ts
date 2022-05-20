import { IFile } from '@shared/types/File/File.types'
import { axiosApiInstance } from '~/infrastructure/axios/axios'
import { ImageCompressor } from '~/infrastructure/File/Image/ImageCompress/ImageCompressor'

export class FileRepository {
  private readonly imageCompressor: ImageCompressor

  constructor() {
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

    return (await axiosApiInstance.post('/file/upload', formData)).data
  }
}

export const useFileRepository = () => {
  return new FileRepository()
}