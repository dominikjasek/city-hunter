import stream from 'stream'
import { IFile } from '~/file/types/file.types'

export interface IUploadService {
  uploadFile: (file: Express.Multer.File) => Promise<IFile>
  getFileStream: (fileKey: string) => Promise<stream.Readable>
}
