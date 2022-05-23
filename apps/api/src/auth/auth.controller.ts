import { Body, Controller, HttpCode, HttpStatus, Post, } from '@nestjs/common'
import { LoginRequest } from '@shared/types/Auth/Auth.types'
import { AuthService } from '~/auth/auth.service'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginRequestData: LoginRequest): Promise<void> {
    await this.authService.thirdPartyLoginHandler(loginRequestData)
  }
}
