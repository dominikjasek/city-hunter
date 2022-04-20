import { Injectable } from '@nestjs/common'
import { sign, verify } from 'jsonwebtoken'

@Injectable()
export class JwtService {
  private readonly secretKey: string | undefined
  private readonly algorithm: string

  constructor() {
    this.secretKey = process.env.AUTH_JWT_SECRET
    this.algorithm = 'HS256'
  }

  async sign(payload: any): Promise<string> {
    return sign(payload, this.secretKey, {
      algorithm: this.algorithm,
    })
  }

  async verify(token: string): Promise<any> {
    return verify(token, this.secretKey, {
      algorithm: this.algorithm,
    })
  }
}
