import { HttpException, HttpStatus } from '@nestjs/common'

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|PNG|png|HEIC|heic)$/)) {
    return callback(new HttpException('Only image files are allowed! These  files have extensions jpg, JPG, jpeg, JPEG, png, PNG, heic, HEIC', HttpStatus.BAD_REQUEST), false)
  }
  callback(null, true)
} 