import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { LoginProvider, Prisma } from '@prisma/client'
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20'
import { AuthService } from '~/auth/auth.service'
import { ITokens } from '~/auth/types/JwtPayload.type'

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: process.env.AUTH_GOOGLE_CLIENT_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      callbackURL: `${process.env.API_URL}/auth/google-login/callback`,
      passReqToCallback: true,
      scope: ['email', 'profile'],
    })
  }

  async validate(
    request: any,
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ) {
    try {
      const userCreateObj: Prisma.UserCreateArgs = {
        data: {
          thirdPartyId: profile.id,
          email: profile.emails?.[0].value ?? '',
          photoUrl: profile.photos?.[0].value ?? '',
          firstName: profile.name?.givenName ?? '',
          lastName: profile.name?.familyName ?? '',
          provider: LoginProvider.GOOGLE,
        },
      }

      const tokens: ITokens = await this.authService.loginWithOAuth(
        userCreateObj,
      )

      const user = {
        tokens,
      }

      done(null, user)
    } catch (err: any) {
      done(err, false)
    }
  }
}