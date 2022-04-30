import { Injectable } from '@nestjs/common'
import { LoginProvider, Prisma, User } from '@prisma/client'
import { PrismaService } from '~/prisma/prisma.service'

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getById(id: number): Promise<User> {
    return await this.prisma.user.findUnique({
      where: { id },
      rejectOnNotFound: true,
    })
  }

  async registerOAuthUser(user: Prisma.UserCreateArgs): Promise<User> {
    return await this.prisma.user.create(user)
  }

  async findUserByThirdPartyId(
    thirdPartyId: string,
    provider: LoginProvider,
  ): Promise<User | null> {
    return await this.prisma.user.findFirst({
      where: {
        thirdPartyId,
        provider,
      },
    })
  }
}
