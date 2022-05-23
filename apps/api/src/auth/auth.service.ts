import { Injectable } from '@nestjs/common'
import { LoginRequest } from '~/_shared/types/Auth/Auth.types'
import { PrismaService } from '~/prisma/prisma.service'
import { UsersService } from '~/users/users.service'

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private readonly usersService: UsersService,
  ) {
  }

  async thirdPartyLoginHandler(loginRequestData: LoginRequest) {
    return await this.prisma.user.upsert({
      where: {
        id: loginRequestData.sub
      },
      update: {
        email: loginRequestData.email,
        firstName: loginRequestData.firstName,
        lastName: loginRequestData.lastName,
      },
      create: {
        email: loginRequestData.email,
        id: loginRequestData.sub,
        firstName: loginRequestData.firstName,
        lastName: loginRequestData.lastName,
      }
    })
  }
}
