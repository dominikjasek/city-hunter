import { Module } from '@nestjs/common'
import { PrismaService } from '~/db/prisma.service'
import { UsersService } from '~/users/users.service'

@Module({
  providers: [UsersService, PrismaService],
  exports: [UsersService],
})
export class UsersModule {}
