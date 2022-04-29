export interface ITokens {
    access_token: string
    refresh_token: string
}

export interface IUserName {
    firstName: string
    lastName: string
}

export interface IUser {
    name: IUserName
    email: string
    photoUrl: string,
    tokens: ITokens
}

export const initialState: IAuthReducer = {
  user: {
    name: {
      firstName: '',
      lastName: ''
    },
    email: '',
    photoUrl: '',
    tokens: {
      refresh_token: '',
      access_token: ''
    }
  },
}

export interface IAuthReducer {
    user: IUser
}