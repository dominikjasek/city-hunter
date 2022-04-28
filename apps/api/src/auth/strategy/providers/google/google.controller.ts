import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common'
import { Response } from 'express'
import { Public } from '~/auth/common/decorators'
import { GoogleAuthGuard } from '~/auth/strategy/providers/google/google-auth.guard'
import { ITokens } from '~/auth/types/JwtPayload.type'

@Controller('auth/google-login')
export class GoogleAuthController {
  @Public()
  @Get('')
  @UseGuards(GoogleAuthGuard)
  googleLogin() {
    // initiates the Google OAuth2 login flow
  }

  @Public()
  @Get('callback')
  @UseGuards(GoogleAuthGuard)
  googleLoginCallback(@Req() req, @Res() res: Response) {
    // handles the Google OAuth2 callback
    const tokens: ITokens = req.user.tokens
    console.log(tokens)
    if (tokens)
      res.redirect(
        `${process.env.WEB_APP_URL}/login-redirect?access_token=${tokens.access_token}&refresh_token=${tokens.refresh_token}`,
      )
    else res.redirect(`${process.env.WEB_APP_URL}/login-redirect`)
  }
}
