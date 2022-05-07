import { IsNotEmptyObject, IsOptional, IsString } from 'class-validator'
import { IPlaceLocation } from '~/place/types/place.types'

export class LocationDto implements IPlaceLocation {
  @IsString()
    lat: string

  @IsString()
    lng: string
}

export class PlaceSuggestionDto {
  @IsString()
    name: string

  @IsNotEmptyObject()
    location: LocationDto

  // ATM can not validate https://github.com/nestjs/nest/issues/4752
  riddlePhoto: Express.Multer.File

  @IsOptional()
    answerPhoto?: Express.Multer.File
}
