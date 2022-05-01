import { Injectable } from '@nestjs/common'
import { User } from '@prisma/client'
import { IRiddle } from 'types/Riddle'
import { PrismaService } from '~/prisma/prisma.service'
import { UsersService } from '~/users/users.service'

@Injectable()
export class RiddleService {
  constructor(
    private readonly userService: UsersService,
    private readonly prismaService: PrismaService,
  ) {}

  async generateRandomRiddleForUser(user: User): Promise<IRiddle> {
    const availableRiddles = await this.prismaService.riddle.findMany({
      where: {
        answers: {
          some: {
            id: {
              not: {
                equals: user.id,
              },
            },
          },
        },
      },
    })

    if (availableRiddles.length === 0) {
      console.log('no riddles available for this user')
      throw new Error('no more riddles available for this user')
    }

    const randomRiddle =
      availableRiddles[Math.floor(Math.random() * availableRiddles.length)]

    this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: {
        currentRiddleId: randomRiddle.id,
      },
    })
    return randomRiddle
  }

  async getRiddleForUserId(userId: number): Promise<IRiddle> {
    const user = await this.userService.getById(userId)

    if (user.currentRiddleId) {
      const currentRiddle = await this.prismaService.riddle.findUnique({
        where: {
          id: user.currentRiddleId,
        },
      })

      if (currentRiddle) {
        console.log('user already has a riddle which is waiting to be answered')
        return currentRiddle
      }

      throw new Error(
        'user should have a riddle which is waiting to be answered but this riddle was not found',
      )
    }

    const newRiddle = await this.generateRandomRiddleForUser(user)
    return newRiddle
  }
}
