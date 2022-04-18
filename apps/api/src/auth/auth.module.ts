import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { AuthController } from '~/auth/auth.controller'
import { AuthService } from '~/auth/auth.service'
import { GoogleStrategy } from '~/auth/strategy/google/google.strategy'
import { JwtStrategy } from '~/auth/strategy/jwt/jwt.strategy'
import { UsersModule } from '~/users/users.module'

@Module({
  imports: [UsersModule, PassportModule],
  providers: [AuthService, GoogleStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
