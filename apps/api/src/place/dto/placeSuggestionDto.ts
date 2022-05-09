import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

// export class LocationDto implements IPlaceLocation {
//   @ApiProperty()
//   @IsString()
//     lat: string
//
//   @ApiProperty()
//   @IsString()
//     lng: string
// }

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

    // ATM can not validate https://github.com/nestjs/nest/issues/4752
    @ApiProperty({ type: 'string', format: 'binary' })
    riddlePhoto: Express.Multer.File

    @ApiProperty({ type: 'string', format: 'binary' })
    @IsOptional()
    solutionPhoto?: Express.Multer.File
}
