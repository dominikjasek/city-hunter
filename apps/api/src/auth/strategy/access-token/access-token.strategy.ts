import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  'access-token',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.AUTH_JWT_SECRET,
    })
  }

  async validate(payload, done) {
    try {
      // You could add a function to the authService to verify the claims of the token:
      // i.e. does the user still have the roles that are claimed by the token
      //const validClaims = await this.authService.verifyTokenClaims(payload);

      //if (!validClaims)
      //    return done(new UnauthorizedException('invalid token claims'), false);

      // console.log('JWT payload:', payload)

      done(null, payload)
    } catch (err: any) {
      throw new UnauthorizedException('unauthorized', err.message)
    }
  }
}
