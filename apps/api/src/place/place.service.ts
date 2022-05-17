import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { PlaceStatus, Prisma } from '@prisma/client'
import { FileService } from '~/file/file.service'
import { PlaceChangeStatusDto } from '~/place/dto/placeChangeStatusDto'
import { PlaceSuggestDto } from '~/place/dto/placeSuggestDto'
import { IPlaceSuggestion } from '~/place/types/place.types'
import { PrismaService } from '~/prisma/prisma.service'
import { RiddleService } from '~/riddle/riddle.service'

@Injectable()
export class PlaceService {
  constructor(private readonly fileService: FileService, private prisma: PrismaService, private readonly riddleService: RiddleService) {
  }

  async validate(placeSuggestionArgs: Prisma.PlaceCreateArgs) {
    if ([placeSuggestionArgs.data.lat, placeSuggestionArgs.data.lng].some(isNaN)) {
      console.log('lat or lng is not a number')
      return false
    }

    // check if there is already existing placeSuggestion with the same lat and lng etc.
    return true
  }

  async createPlace(userId: number, placeSuggestionDto: PlaceSuggestDto): Promise<IPlaceSuggestion> {
    const placeSuggestionArgs: Prisma.PlaceCreateArgs = {
      data: {
        authorId: userId,
        lat: Number(placeSuggestionDto.lat),
        lng: Number(placeSuggestionDto.lng),
        name: placeSuggestionDto.name,
        riddlePhotoUrl: placeSuggestionDto.riddlePhotoUrl,
        solutionPhotoUrl: placeSuggestionDto.solutionPhotoUrl,
      },
    }

    const isValidSuggestion = await this.validate(placeSuggestionArgs)

    if (!isValidSuggestion) {
      throw new HttpException('Place suggestion is not valid', HttpStatus.BAD_REQUEST)
    }

    const placeSuggestionResult = await this.prisma.place.create(placeSuggestionArgs)

    return {
      id: placeSuggestionResult.id,
      name: placeSuggestionResult.name,
      location: {
        lng: placeSuggestionResult.lng.toString(),
        lat: placeSuggestionResult.lat.toString(),
      },
      riddlePhotoUrl: placeSuggestionResult.riddlePhotoUrl,
      solutionPhotoUrl: placeSuggestionResult.solutionPhotoUrl ?? undefined,
    }
  }

  async updateStatus(placeId: number, newStatus: PlaceStatus) {
    return await this.prisma.place.update({
      where: {
        id: placeId,
      },
      data: {
        status: newStatus,
      },
    })
  }

  async changeStatus(placeChangeStatusDto: PlaceChangeStatusDto) {
    const place = await this.prisma.place.update({
      where: {
        id: placeChangeStatusDto.id,
      },
      data: {
        status: placeChangeStatusDto.status,
      },
    })

    switch (placeChangeStatusDto.status) {
      case PlaceStatus.accepted:
        await this.riddleService.createRiddle(placeChangeStatusDto.id)

      default:
        break
    }

    return {
      id: place.id,
      name: place.name,
      location: {
        lng: place.lng.toString(),
        lat: place.lat.toString(),
      },
      riddlePhotoUrl: place.riddlePhotoUrl,
      solutionPhotoUrl: place.solutionPhotoUrl ?? undefined,
    }

  }

  async getSuggestionsWithStatus(status?: PlaceStatus): Promise<IPlaceSuggestion[]> {
    const suggestions = await this.prisma.place.findMany({
      where: {
        status,
      },
    })

    return suggestions.map(suggestion => ({
      id: suggestion.id,
      name: suggestion.name,
      location: {
        lng: suggestion.lng.toString(),
        lat: suggestion.lat.toString(),
      },
      riddlePhotoUrl: suggestion.riddlePhotoUrl,
      solutionPhotoUrl: suggestion.solutionPhotoUrl ?? undefined,
    }))
  }
}
