import { ITokens } from '@shared/types/Auth/Auth.types'

export enum UserRole {
    user = 'user',
    admin = 'admin',
}

export interface IUser {
    id: number
    name: IUserName
    email: string
    role: UserRole
    photoUrl: string
}

export type IAuthReducer = {
    user: IUser | null
    tokens: ITokens
}

export const initialState: IAuthReducer = {
  user: null,
  tokens: {
    access_token: '',
    refresh_token: '',
  },
}

export interface IUserName {
    firstName: string
    lastName: string
}