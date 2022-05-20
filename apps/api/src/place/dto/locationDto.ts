import { IsNumber } from 'class-validator'

export interface ILocation {
  lat: number
  lng: number
}

export class LocationDto implements ILocation {
  @IsNumber()
    lat: number

  @IsNumber()
    lng: number
}