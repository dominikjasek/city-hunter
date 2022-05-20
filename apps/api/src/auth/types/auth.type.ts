export interface IJwtPayload {
  sub: number
  email: string
  role: string
}

export interface IJwtPayloadWithRt extends IJwtPayload {
  refreshToken: string
}
