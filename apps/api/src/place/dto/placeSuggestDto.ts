import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class PlaceSuggestDto {
  @ApiProperty({
    description: 'Brief description of the place',
  })

  @IsNotEmpty()
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
  @IsNotEmpty()
    riddlePhotoUrl: string

  @ApiProperty()
  @IsString()
  @IsOptional()
    solutionPhotoUrl?: string
}
