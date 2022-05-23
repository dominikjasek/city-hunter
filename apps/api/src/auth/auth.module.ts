import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { AuthController } from '~/auth/auth.controller'
import { AuthService } from '~/auth/auth.service'
import { AuthorizationGuard } from '~/auth/guards/index'
import { UsersModule } from '~/users/users.module'

@Module({
  imports: [UsersModule],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthorizationGuard,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {
}
