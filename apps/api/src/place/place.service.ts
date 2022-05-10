import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { PlaceStatus, Prisma } from '@prisma/client'
import { FileService } from '~/file/file.service'
import { IFile } from '~/file/types/file.types'
import { PlaceSuggestionDto } from '~/place/dto/placeSuggestionDto'
import { IPlaceSuggestion } from '~/place/types/place.types'
import { PrismaService } from '~/prisma/prisma.service'

@Injectable()
export class PlaceService {
  constructor(private readonly fileService: FileService, private prisma: PrismaService) {
  }

  async uploadPhotos(riddlePhotoFile: Express.Multer.File, solutionPhotoFile?: Express.Multer.File): Promise<{ riddlePhoto: IFile; solutionPhoto: IFile | null }> {
    const riddlePhotoPromise = this.fileService.uploadFile(riddlePhotoFile)
    let solutionPhotoPromise: Promise<IFile | void> = Promise.resolve()
    if (solutionPhotoFile) {
      solutionPhotoPromise = this.fileService.uploadFile(solutionPhotoFile)
    }

    const [riddlePhoto, solutionPhoto] = await Promise.all([riddlePhotoPromise, solutionPhotoPromise])

    return { riddlePhoto, solutionPhoto: solutionPhoto ?? null }
  }

  async validate(placeSuggestionArgs: Prisma.PlaceCreateArgs) {
    if ([placeSuggestionArgs.data.lat, placeSuggestionArgs.data.lng].some(isNaN)) {
      console.log('lat or lng is not a number')
      return false
    }

    // check if there is already existing placeSuggestion with the same lat and lng etc.
    return true
  }

  async createPlace(userId: number, placeSuggestionDto: PlaceSuggestionDto): Promise<IPlaceSuggestion> {
    const {
      solutionPhoto,
      riddlePhoto
    } = await this.uploadPhotos(placeSuggestionDto.riddlePhoto, placeSuggestionDto.solutionPhoto)

    const placeSuggestionArgs: Prisma.PlaceCreateArgs = {
      data: {
        authorId: userId,
        lat: Number(placeSuggestionDto.lat),
        lng: Number(placeSuggestionDto.lng),
        name: placeSuggestionDto.name,
        riddlePhotoUrl: riddlePhoto?.url,
        solutionPhotoUrl: solutionPhoto?.url,
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
}
