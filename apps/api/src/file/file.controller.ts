import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { Response } from 'express'
import { Public } from '~/auth/common/decorators/index'
import { FileService } from '~/file/file.service'
import { imageFileFilter } from '~/file/filters/imageFileFilter'
import { IFile } from '~/file/types/file.types'

@Controller('file')
export class FileController {
  constructor(private readonly uploadService: FileService) {
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: imageFileFilter,
    limits: {
      fileSize: 4 * 1024 * 1024,  //4MB
    }
  }))
  async uploadFile(
    @Body() dto,
      @UploadedFile() file: Express.Multer.File,
  ): Promise<IFile> {
    return await this.uploadService.uploadFile(file)
  }

  @Get('/:fileName')
  @Public()
  @HttpCode(HttpStatus.CREATED)
  async getFile(
    @Param('fileName') fileName: string,
      @Res() res: Response,
  ): Promise<void> {
    const fileStream = await this.uploadService.getFileStream(fileName)
    fileStream.on('error', () => {
      res.end('This file does not exist')
    })
    fileStream.pipe(res)
  }
}
