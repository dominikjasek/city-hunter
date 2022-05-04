import {
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { Response } from 'express'

import { Public } from '~/auth/common/decorators/index'
import { IUploadService } from '~/file/file.types'
import { S3_SERVICE } from '~/file/services/s3.service'
import { IFile } from '~/file/types/file.types'

@Controller('file')
export class FileController {
  constructor(
    @Inject(S3_SERVICE)
    private readonly uploadService: IUploadService,
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<IFile> {
    return await this.uploadService.uploadFile(file)
  }

  @Get('/:fileName')
  @Public()
  async getFile(
    @Param('fileName') fileName: string,
    @Res() res: Response,
  ): Promise<any> {
    const fileStream = await this.uploadService.getFileStream(fileName)
    return fileStream.pipe(res)
  }
}
