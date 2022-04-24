import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common'
import { AccessTokenGuard } from '~/auth/strategy/access-token/access-token.guard'
import { RefreshTokenGuard } from '~/auth/strategy/refresh-token/refresh-token.guard'
import { AuthService } from '~/auth/auth.service'
import { GetCurrentUserId } from '~/auth/common/decorators'
import { GetCurrentUser } from '~/auth/common/decorators'
import { ITokens } from '~/auth/types/JwtPayload.type'
import { Public } from '~/auth/common/decorators'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refreshTokens(
    @GetCurrentUserId() userId: number,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ): Promise<ITokens> {
    return this.authService.refreshTokens(userId, refreshToken)
  }

  @Post('logout')
  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.OK)
  logout(@GetCurrentUserId() userId: number): Promise<boolean> {
    return this.authService.logout(userId)
  }

  @Get('protected')
  @UseGuards(AccessTokenGuard)
  protectedResource() {
    return {
      data: 'JWT is working!',
    }
  }
}
