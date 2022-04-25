export interface IJwtPayload {
  sub: number
  email: string
}

export interface IJwtPayloadWithRt extends IJwtPayload {
  refreshToken: string
}

export interface ITokens {
  access_token: string
  refresh_token: string
}