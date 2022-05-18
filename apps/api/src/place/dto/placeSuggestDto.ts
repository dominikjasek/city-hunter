import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class PlaceSuggestDto {
  @ApiProperty({
    description: 'Brief description of the place',
  })

  @IsNotEmpty()
  @IsString()
    name: string

  @ApiProperty()
  @IsNumber()
    lng: number

  @ApiProperty()
  @IsNumber()
    lat: number

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
    riddlePhotoUrl: string

  @ApiProperty()
  @IsString()
  @IsOptional()
    solutionPhotoUrl?: string
}
