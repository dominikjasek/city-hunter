import { ApiProperty } from '@nestjs/swagger'
import { PlaceStatus } from '@prisma/client'
import { IsEnum, IsOptional } from 'class-validator'

export class PlaceGetSuggestionsDto {
  @ApiProperty()
  @IsEnum(PlaceStatus)
  @IsOptional()
    status?: PlaceStatus
}
