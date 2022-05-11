import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

export class PlaceSuggestionDto {
  @ApiProperty({
    description: 'Brief description of the place',
  })
  @IsString()
    name: string

  @ApiProperty()
  @IsString()
    lng: string

  @ApiProperty()
  @IsString()
    lat: string

  @ApiProperty()
  @IsString()
    riddlePhotoUrl: string

  @ApiProperty()
  @IsString()
  @IsOptional()
    solutionPhotoUrl?: string
}
