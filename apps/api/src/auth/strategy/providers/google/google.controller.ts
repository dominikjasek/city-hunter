import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common'
import { Response } from 'express'
import { Public } from '~/auth/common/decorators'
import { GoogleAuthGuard } from '~/auth/strategy/providers/google/google-auth.guard'
import { UsersService } from '~/users/users.service'

@Controller('auth/google-login')
export class GoogleAuthController {
  constructor(private usersService: UsersService) {}

  @Public()
  @Get('')
  @UseGuards(GoogleAuthGuard)
  googleLogin() {
    // initiates the Google OAuth2 login flow
  }

  @Public()
  @Get('callback')
  @UseGuards(GoogleAuthGuard)
  async googleLoginCallback(@Req() req, @Res() res: Response) {
    // handles the Google OAuth2 callback
    const user = await this.usersService.getById(req.user.id)

    const userData = {
      id: user.id.toString(),
      firstName: user.firstName,
      lastName: user.lastName,
      photoUrl: user.photoUrl,
      access_token: req.user.access_token,
      refresh_token: req.user.refresh_token,
      email: user.email,
    }
    const queryParams: string = new URLSearchParams(userData).toString()

    if (queryParams)
      res.redirect(`${process.env.WEB_APP_URL}/login-redirect?${queryParams}`)
    else res.redirect(`${process.env.WEB_APP_URL}/login-redirect`)
  }
}
