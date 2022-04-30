import { ITokens } from '~/auth/types/JwtPayload.type'

export interface IUserName {
  firstName: string
  lastName: string
}

export interface IUser {
  name: IUserName
  email: string
  id: number
  photoUrl: string
  tokens: ITokens
}
