import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common'
import { Response } from 'express'
import { GoogleAuthGuard } from 'src/auth/strategy/google/google-auth.guard'
import { JwtGuard } from '~/src/auth/strategy/jwt/jwt.guard'

@Controller('auth')
export class AuthController {
  @Get('google-login')
  @UseGuards(GoogleAuthGuard)
  googleLogin() {
    // initiates the Google OAuth2 login flow
  }

  @Get('google-login/callback')
  @UseGuards(GoogleAuthGuard)
  googleLoginCallback(@Req() req, @Res() res: Response) {
    // handles the Google OAuth2 callback
    const jwt: string = req.user.jwt
    console.log('google/callback', jwt)
    if (jwt) res.redirect(`${process.env.WEB_APP_URL}/about?jwt=${jwt}`)
    else res.redirect(`${process.env.WEB_APP_URL}/about`)
  }

  @Get('protected')
  @UseGuards(JwtGuard)
  protectedResource() {
    return {
      data: 'JWT is working!',
    }
  }
}
