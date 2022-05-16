import { Module } from '@nestjs/common'
import { FileModule } from '~/file/file.module'
import { PlaceController } from '~/place/place.controller'
import { PlaceService } from '~/place/place.service'
import { RiddleModule } from '~/riddle/riddle.module'

@Module({
  imports: [FileModule, RiddleModule],
  providers: [PlaceService],
  controllers: [PlaceController],
})
export class PlaceModule {
}
