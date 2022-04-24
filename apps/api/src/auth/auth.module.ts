import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { AuthController } from '~/auth/auth.controller'
import { AuthService } from '~/auth/auth.service'
import { GoogleStrategy } from '~/auth/strategy/providers/google/google.strategy'
import { JwtService } from '~/auth/strategy/jwt/jwt.service'
import { AccessTokenStrategy } from '~/auth/strategy/access-token/access-token.strategy'
import { UsersModule } from '~/users/users.module'
import { RefreshTokenStrategy } from '~/auth/strategy/refresh-token/refresh-token.strategy'
import { GoogleAuthController } from '~/auth/strategy/providers/google/google.controller'

@Module({
  imports: [UsersModule, PassportModule],
  providers: [
    AuthService,
    GoogleStrategy,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    JwtService,
  ],
  controllers: [AuthController, GoogleAuthController],
})
export class AuthModule {}
