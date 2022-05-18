export interface IRiddle {
  id: number
  riddlePhotoUrl: string,
}

export interface IAvailability {
  isAvailable: boolean
  message?: string
}

export interface IRiddleWithAvailability {
  availability: IAvailability
  riddle?: IRiddle
}
