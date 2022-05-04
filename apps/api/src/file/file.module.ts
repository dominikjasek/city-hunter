import { Module } from '@nestjs/common'
import { FileController } from '~/file/file.controller'
import { S3_SERVICE, S3Service } from '~/file/services/s3.service'

@Module({
  controllers: [FileController],
  providers: [
    {
      useClass: S3Service,
      provide: S3_SERVICE,
    },
  ],
})
export class FileModule {}
