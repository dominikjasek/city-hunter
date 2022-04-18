import { Controller, Get, UseGuards } from '@nestjs/common'
import { AppService } from '~/app.service'
import { JwtGuard } from '~/auth/strategy/jwt/jwt.guard'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(JwtGuard)
  getHello(): any {
    return this.appService.getHello()
  }
}
