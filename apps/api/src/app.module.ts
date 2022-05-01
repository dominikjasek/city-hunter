import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { AppController } from '~/app.controller'
import { AppService } from '~/app.service'
import { AuthModule } from '~/auth/auth.module'
import { AccessTokenGuard } from '~/auth/strategy/access-token/access-token.guard'
import { PrismaModule } from '~/prisma/prisma.module'
import { UsersModule } from '~/users/users.module'
import { RiddleModule } from './riddle/riddle.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    UsersModule,
    PrismaModule,
    RiddleModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
  ],
})
export class AppModule {}
