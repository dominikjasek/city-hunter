import { Controller, Get, UseGuards } from '@nestjs/common'
import { AppService } from '~/app.service'
import { Public } from '~/auth/common/decorators/index'
import { AccessTokenGuard } from '~/auth/strategy/access-token/access-token.guard'

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

  @Get()
  @UseGuards(AccessTokenGuard)
  getHello(): any {
    return this.appService.getHello()
  }
}
