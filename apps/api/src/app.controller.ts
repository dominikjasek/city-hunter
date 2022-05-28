import { Controller, Get } from '@nestjs/common'
import { PingResponse } from '@shared/types/Ping/Ping.types'
import { AppService } from '~/app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get('ping')
  async ping(): Promise<PingResponse> {
    return {
      data: 'pong',
    }
  }
}
