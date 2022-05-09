import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmptyObject, IsOptional, IsString } from 'class-validator'
import { IPlaceLocation } from '~/place/types/place.types'

export class LocationDto implements IPlaceLocation {
  @ApiProperty()
  @IsString()
    lat: string

  @ApiProperty()
  @IsString()
    lng: string
}

export class PlaceSuggestionDto {
  @ApiProperty({
    description: 'Brief description of the place',
  })
  @IsString()
    name: string

  @ApiProperty()
  @IsNotEmptyObject()
    location: LocationDto

  // ATM can not validate https://github.com/nestjs/nest/issues/4752
  @ApiProperty({ type: 'string', format: 'binary' })
    riddlePhoto: Express.Multer.File

  @ApiProperty({ type: 'string', format: 'binary' })
  @IsOptional()
    solutionPhoto?: Express.Multer.File
}
