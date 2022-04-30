export interface ITokens {
    access_token: string
    refresh_token: string
}

export interface IUserName {
    firstName: string
    lastName: string
}

export interface IUser {
    id: number
    name: IUserName
    email: string
    photoUrl: string,
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
