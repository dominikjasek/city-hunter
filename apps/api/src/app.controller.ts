import { Controller, Get, UseGuards } from '@nestjs/common'
import { AppService } from 'src/app.service'
import { JwtGuard } from '~/src/auth/strategy/jwt/jwt.guard'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(JwtGuard)
  getHello(): any {
    return this.appService.getHello()
  }
}
