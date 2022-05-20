import { Body, Controller, Get, Param, Post, UseGuards, } from '@nestjs/common'
import { IPlaceSuggestion } from '@shared/types/Place/Place.types'
import { GetCurrentUserId } from '~/auth/common/decorators'
import { AdminGuard } from '~/auth/strategy/admin/admin.guard'
import { PlaceChangeStatusDto } from '~/place/dto/placeChangeStatusDto'
import { PlaceGetSuggestionsDto } from '~/place/dto/placeGetSuggestionsDto'
import { PlaceSuggestDto } from '~/place/dto/placeSuggestDto'
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
      @Body() placeSuggestionDto: PlaceSuggestDto,
  ): Promise<IPlaceSuggestion> {
    console.log(placeSuggestionDto)
    return await this.placeService.createPlace(userId, placeSuggestionDto)
  }

  @Get(':status?')
  async getAllSuggestions(
    @Param() placeSuggestionDto: PlaceGetSuggestionsDto,
  ): Promise<IPlaceSuggestion[]> {
    return await this.placeService.getSuggestionsWithStatus(placeSuggestionDto.status)
  }

  @Post('change-status')
  @UseGuards(AdminGuard)
  async changeStatus(
    @Body() placeChangeStatusDto: PlaceChangeStatusDto,
  ): Promise<IPlaceSuggestion> {
    return await this.placeService.changeStatus(placeChangeStatusDto)
  }
}
