import { ForbiddenException, Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import * as argon from 'argon2'
import { JwtService } from '~/auth/strategy/jwt/jwt.service'
import { IJwtPayload, ITokens } from '~/auth/types/auth.type'
import { PrismaService } from '~/prisma/prisma.service'
import { UsersService } from '~/users/users.service'

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async loginWithOAuth(
    userCreateObj: Prisma.UserCreateArgs,
  ): Promise<ITokens & { id: number }> {
    let user = await this.usersService.findUserByThirdPartyId(
      userCreateObj.data.thirdPartyId,
      userCreateObj.data.provider,
    )

    if (user === null) {
      user = await this.usersService.registerOAuthUser(userCreateObj)
    }

    const tokens = await this.getTokens(user.id, user.email)
    await this.updateRtHash(user.id, tokens.refresh_token)

    return {
      ...tokens,
      id: user.id,
    }
  }

  async logout(userId: number): Promise<boolean> {
    await this.prisma.user.updateMany({
      where: {
        id: userId,
        refreshToken: {
          not: null,
        },
      },
      data: {
        refreshToken: null,
      },
    })
    return true
  }

  async refreshTokens(userId: number, refresh_token: string): Promise<ITokens> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    })
    if (!user || !user.refreshToken)
      throw new ForbiddenException('Access Denied')

    const rtMatches = await argon.verify(user.refreshToken, refresh_token)
    if (!rtMatches) throw new ForbiddenException('Access Denied')

    const tokens = await this.getTokens(user.id, user.email)
    await this.updateRtHash(user.id, tokens.refresh_token)

    return tokens
  }

  async updateRtHash(userId: number, rt: string): Promise<void> {
    const hash = await argon.hash(rt)
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        refreshToken: hash,
      },
    })
  }

  async getTokens(userId: number, email: string): Promise<ITokens> {
    const jwtPayload: IJwtPayload = {
      sub: userId,
      email: email,
    }

    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.sign(jwtPayload),
      this.jwtService.sign(
        jwtPayload,
        process.env.AUTH_REFRESH_TOKEN_SECRET,
        process.env.AUTH_REFRESH_TOKEN_EXPIRATION_TIME,
      ),
    ])

    return {
      access_token,
      refresh_token,
    }
  }
}
