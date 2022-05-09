import { Body, Controller, HttpException, HttpStatus, Post, UploadedFiles, UseInterceptors, } from '@nestjs/common'
import { FileFieldsInterceptor } from '@nestjs/platform-express'
import { GetCurrentUserId } from '~/auth/common/decorators'
import { imageFileFilter } from '~/file/filters/imageFileFilter'
import { PlaceSuggestionDto } from '~/place/dto/placeSuggestionDto'
import { PlaceService } from '~/place/place.service'

@Controller('place')
export class PlaceController {
    constructor(
        private readonly placeService: PlaceService,
    ) {
    }

    @Post('suggest')
    @UseInterceptors(FileFieldsInterceptor([
            { name: 'riddlePhoto', maxCount: 1 },
            { name: 'solutionPhoto', maxCount: 1 }
        ],
        {
            fileFilter: imageFileFilter,
            limits: {
                fileSize: 10 * 1024 * 1024, // 10MB 
            }
        }))
    async create(
        @UploadedFiles()
            files: {
            riddlePhoto: Express.Multer.File[]
            solutionPhoto?: Express.Multer.File[]
        },
        @GetCurrentUserId() userId: number,
        @Body() placeSuggestionDto: PlaceSuggestionDto,
    ) {
        if (!files.riddlePhoto?.[0]) {
            throw new HttpException('Riddle photo is required', HttpStatus.BAD_REQUEST,)
        }

        return await this.placeService.createPlace(userId, {
            ...placeSuggestionDto,
            solutionPhoto: files.solutionPhoto?.[0],
            riddlePhoto: files.riddlePhoto[0],
        })
    }
}
