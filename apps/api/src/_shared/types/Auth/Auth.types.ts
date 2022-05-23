export interface ITokens {
  access_token: string
  refresh_token: string
}

export interface LoginRequest {
  email: string
  firstName: string
  lastName: string
  sub: string
}

export type LoginResponse = void