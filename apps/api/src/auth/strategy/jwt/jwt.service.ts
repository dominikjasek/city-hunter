import { Injectable } from '@nestjs/common'
import { sign, verify } from 'jsonwebtoken'

@Injectable()
export class JwtService {
  private readonly secretKey: string
  private readonly algorithm: string
  private readonly expirationTime: string //https://www.npmjs.com/package/jsonwebtoken

  constructor() {
    this.secretKey = process.env.AUTH_JWT_SECRET as string
    this.algorithm = process.env.AUTH_JWT_ALGORITHM as string
    this.expirationTime = process.env.AUTH_JWT_EXPIRATION_TIME as string
  }

  async sign(
    payload: any,
    secretKey = this.secretKey,
    expiresIn = this.expirationTime,
  ): Promise<string> {
    return sign(payload, secretKey, {
      algorithm: this.algorithm,
      expiresIn,
    })
  }

  async verify(token: string): Promise<any> {
    return verify(token, this.secretKey, {
      algorithm: this.algorithm,
    })
  }
}
