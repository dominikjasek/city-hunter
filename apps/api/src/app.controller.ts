import { Controller, Get } from '@nestjs/common'
import { PingResponse } from '@shared/types/Ping/Ping.types'
import { AppService } from '~/app.service'
import { Public } from '~/auth/common/decorators/index'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Public()
  @Get('ping')
  async ping(): Promise<PingResponse> {
    return {
      data: 'pong',
    }
  }
}
