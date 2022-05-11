import { Body, Controller, Post, } from '@nestjs/common'
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
  async create(
  @GetCurrentUserId() userId: number,
    @Body() placeSuggestionDto: PlaceSuggestionDto,
  ) {
    return await this.placeService.createPlace(userId, placeSuggestionDto)
  }
}
