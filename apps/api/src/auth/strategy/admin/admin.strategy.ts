import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { UserRole } from '@prisma/client'
import { ExtractJwt, Strategy } from 'passport-jwt'

@Injectable()
export class AdminStrategy extends PassportStrategy(
  Strategy,
  'admin',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.AUTH_JWT_SECRET,
    })
  }

  async validate(payload, done) {
    try {
      if (payload.role !== UserRole.admin) {
        return done(new UnauthorizedException('You need to have role ADMIN to acces this.'), false)
      }

      done(null, payload)
    } catch (err: any) {
      throw new UnauthorizedException('unauthorized', err.message)
    }
  }
}
