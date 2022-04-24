import { Controller, Get } from '@nestjs/common'
import { AppService } from '~/app.service'
import { Public } from '~/auth/common/decorators/index'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get('ping')
  ping() {
    return {
      data: 'pong',
    }
  }
}
