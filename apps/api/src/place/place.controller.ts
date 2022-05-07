import { Body, Controller, HttpException, HttpStatus, Post, UploadedFiles, UseInterceptors, } from '@nestjs/common'
import { FileFieldsInterceptor } from '@nestjs/platform-express'
import { GetCurrentUserId } from '~/auth/common/decorators'
import { PlaceSuggestionDto } from '~/place/dto/placeSuggestionDto'
import { PlaceService } from '~/place/place.service'

@Controller('place')
export class PlaceController {
  constructor(
    private readonly placeService: PlaceService,
  ) {
  }

  @Post('suggest')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'riddlePhoto', maxCount: 1 }, { name: 'answerPhoto', maxCount: 1 },]),)
  async create(
  @UploadedFiles()
    files: {
      riddlePhoto: Express.Multer.File[]
      answerPhoto?: Express.Multer.File[]
    },
    @GetCurrentUserId() userId: number,
    @Body() placeSuggestionDto: PlaceSuggestionDto,
  ) {
    if (!files.riddlePhoto?.[0]) {
      throw new HttpException('Riddle photo is required', HttpStatus.BAD_REQUEST,)
    }

    return await this.placeService.createPlace(userId, {
      ...placeSuggestionDto,
      answerPhoto: files.answerPhoto?.[0],
      riddlePhoto: files.riddlePhoto[0],
    })
  }
}
