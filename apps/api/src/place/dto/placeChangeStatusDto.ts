import { ApiProperty } from '@nestjs/swagger'
import { PlaceStatus } from '@prisma/client'
import { IsEnum, IsNumber, IsString } from 'class-validator'

export class PlaceChangeStatusDto {
  @ApiProperty()
  @IsNumber()
    id: number

  @ApiProperty()
  @IsString()
  @IsEnum(PlaceStatus)
    status: PlaceStatus
}
