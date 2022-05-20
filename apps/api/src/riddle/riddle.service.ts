import { Injectable } from '@nestjs/common'
import { Riddle, User } from '@prisma/client'
import { PrismaService } from '~/prisma/prisma.service'
import { IRiddleWithAvailability } from '~/riddle/riddle.interface'
import { UsersService } from '~/users/users.service'

@Injectable()
export class RiddleService {
  constructor(
    private readonly userService: UsersService,
    private readonly prismaService: PrismaService,
  ) {
  }

  async generateRandomRiddleForUser(
    user: User,
  ): Promise<IRiddleWithAvailability> {
    const availableRiddles = await this.prismaService.riddle.findMany({
      where: {
        solvedRiddles: {
          none: {
            userId: {
              equals: user.id,
            },
          },
        },
        AND: {
          place: {
            status: {
              equals: 'accepted'
            }
          }
        }
      },
      include: {
        place: {
          select: {
            riddlePhotoUrl: true
          }
        }
      }
    })

    if (availableRiddles.length === 0) {
      return {
        availability: {
          isAvailable: false,
          message: 'Už jste odpověděli na všechny úlohy. Můžete přidat vlastní fotku a rozšířit tak databázi míst.'
        },
      }
    }

    const randomRiddle = availableRiddles[Math.floor(Math.random() * availableRiddles.length)]

    await this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: {
        currentRiddleId: randomRiddle.id,
      },
    })
    return {
      availability: {
        isAvailable: true,
      },
      riddle: {
        id: randomRiddle.id,
        riddlePhotoUrl: randomRiddle.place.riddlePhotoUrl,
      },
    }
  }

  async getRiddleForUserId(userId: number): Promise<IRiddleWithAvailability> {
    const user = await this.userService.getById(userId)

    if (user.currentRiddleId) {
      const currentRiddle = await this.prismaService.riddle.findUnique({
        where: {
          id: user.currentRiddleId,
        },
        include: {
          place: true,
        }
      })

      if (!currentRiddle) {
        throw new Error(
          'user should have a riddle which is waiting to be answered but this riddle was not found',
        )
      }

      return {
        availability: { isAvailable: true },
        riddle: {
          id: currentRiddle.id,
          riddlePhotoUrl: currentRiddle.place.riddlePhotoUrl,
        },
      }
    }

    const newRiddle = await this.generateRandomRiddleForUser(user)
    return newRiddle
  }

  async createRiddleTransaction(placeId: number) {
    return this.prismaService.riddle.create({
      data: {
        place: {
          connect: {
            id: placeId
          }
        }
      },
    })
  }

  async createRiddle(placeId: number): Promise<Riddle> {
    return await this.createRiddleTransaction(placeId)
  }
}
