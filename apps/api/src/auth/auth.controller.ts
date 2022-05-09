import { Controller, Get, HttpCode, HttpStatus, Post, UseGuards, } from '@nestjs/common'
import { AuthService } from '~/auth/auth.service'
import { GetCurrentUser, GetCurrentUserId, Public, } from '~/auth/common/decorators'
import { RefreshTokenGuard } from '~/auth/strategy/refresh-token/refresh-token.guard'
import { ITokens } from '~/auth/types/auth.type'

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

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
    @HttpCode(HttpStatus.OK)
    logout(@GetCurrentUserId() userId: number): Promise<boolean> {
        return this.authService.logout(userId)
    }

    @Get('protected')
    protectedResource() {
        return {
            data: 'JWT is working!',
        }
    }
}
