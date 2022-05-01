import { Module } from '@nestjs/common';
import { RiddleController } from './riddle.controller';
import { RiddleService } from './riddle.service';

@Module({
  controllers: [RiddleController],
  providers: [RiddleService]
})
export class RiddleModule {}
