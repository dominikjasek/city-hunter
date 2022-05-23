import { Injectable } from '@nestjs/common'
import { User } from '@prisma/client'
import { PrismaService } from '~/prisma/prisma.service'

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {
  }

  async getById(id: string): Promise<User> {
    return await this.prisma.user.findUnique({
      where: { id },
      rejectOnNotFound: true,
    })
  }

}
