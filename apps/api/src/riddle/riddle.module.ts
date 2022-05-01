import { Module } from '@nestjs/common'
import { UsersModule } from '~/users/users.module'
import { RiddleController } from './riddle.controller'
import { RiddleService } from './riddle.service'

@Module({
  imports: [UsersModule],
  controllers: [RiddleController],
  providers: [RiddleService],
})
export class RiddleModule {}
