import { Injectable } from '@nestjs/common'
import { User } from '@prisma/client'
import { PrismaService } from '~/db/prisma.service'

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  async getHello(): Promise<{ posts: User[] }> {
    const allUsers = await this.prisma.user.findMany()
    return { posts: allUsers }
  }
}
