import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsDefined, IsNotEmpty, IsNotEmptyObject, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator'
import { ILocation, LocationDto } from '~/place/dto/locationDto'

export class PlaceSuggestDto {
  @ApiProperty({
    description: 'Brief description of the place',
  })

  @IsNotEmpty()
  @IsString()
    name: string

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => LocationDto)
    location: ILocation

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
    riddlePhotoUrl: string

  @ApiProperty()
  @IsString()
  @IsOptional()
    solutionPhotoUrl?: string
}
