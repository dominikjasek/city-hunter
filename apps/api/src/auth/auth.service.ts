import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { sign } from 'jsonwebtoken'
import { JwtService } from '~/auth/strategy/jwt/jwt.service'
import { UsersService } from '~/users/users.service'

@Injectable()
export class AuthService {
  private readonly JWT_SECRET_KEY = process.env.AUTH_JWT_SECRET

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateOAuthLogin(
    userCreateObj: Prisma.UserCreateArgs,
  ): Promise<string> {
    let user = await this.usersService.findUserByThirdPartyId(
      userCreateObj.data.thirdPartyId,
      userCreateObj.data.provider,
    )

    if (user === null) {
      user = await this.usersService.registerOAuthUser(userCreateObj)
    }

    const jwtPayload = {
      userId: user.id,
    }

    const jwt = this.jwtService.sign(jwtPayload)
    return jwt
  }
}
