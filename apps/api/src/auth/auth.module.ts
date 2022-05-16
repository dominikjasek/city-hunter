import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { AuthController } from '~/auth/auth.controller'
import { AuthService } from '~/auth/auth.service'
import { AccessTokenStrategy } from '~/auth/strategy/access-token/access-token.strategy'
import { AdminStrategy } from '~/auth/strategy/admin/admin.strategy'
import { JwtService } from '~/auth/strategy/jwt/jwt.service'
import { GoogleAuthController } from '~/auth/strategy/providers/google/google.controller'
import { GoogleStrategy } from '~/auth/strategy/providers/google/google.strategy'
import { RefreshTokenStrategy } from '~/auth/strategy/refresh-token/refresh-token.strategy'
import { UsersModule } from '~/users/users.module'

@Module({
  imports: [UsersModule, PassportModule],
  providers: [
    AuthService,
    GoogleStrategy,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    AdminStrategy,
    JwtService,
  ],
  controllers: [AuthController, GoogleAuthController],
})
export class AuthModule {
}
