export interface IRiddle {
  id: number
}

export interface IAvailability {
  isAvailable: boolean
  message?: string
}

export interface IRiddleWithAvailability {
  availability: IAvailability
  riddle?: IRiddle
}
