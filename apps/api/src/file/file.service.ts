import { Injectable } from '@nestjs/common'
import { IFile } from '@shared/types/File/File.types'
import * as S3 from 'aws-sdk/clients/s3'
import * as stream from 'stream'
import { v4 as uuid } from 'uuid'

@Injectable()
export class FileService {
  private readonly s3: S3

  constructor() {
    this.s3 = new S3({
      region: process.env.AWS_BUCKET_REGION,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_KEY,
    })
  }

  async uploadFile(file: Express.Multer.File): Promise<IFile> {
    const fileName = uuid() // Generate random file name because we don't want to share name of original file

    const data = await this.s3
      .upload({
        Bucket: process.env.AWS_BUCKET_NAME as string,
        Body: file.buffer,
        Key: fileName,
      })
      .promise()

    const url = `${process.env.API_URL}/file/${data.Key}`

    return {
      url,
      key: data.Key,
    }
  }

  async getFileStream(fileKey: string): Promise<stream.Readable> {
    const params = {
      Key: fileKey,
      Bucket: process.env.AWS_BUCKET_NAME as string,
    }

    return this.s3.getObject(params).createReadStream()
  }
}
