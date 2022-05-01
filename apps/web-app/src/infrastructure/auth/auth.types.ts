import { ITokens } from 'types/Auth'
import { IUser } from 'types/User'

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
