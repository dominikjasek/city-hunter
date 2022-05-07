import { Test, TestingModule } from '@nestjs/testing'
import { PrismaService } from '~/prisma/prisma.service'
import { IRiddleWithAvailability } from '~/riddle/riddle.interface'
import { UsersService } from '~/users/users.service'
import { RiddleService } from './riddle.service'

describe('RiddleService', () => {
  let prisma: PrismaService
  let riddleService: RiddleService
  let module: TestingModule

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [RiddleService, UsersService, PrismaService],
    }).compile()

    riddleService = module.get<RiddleService>(RiddleService)
    prisma = module.get<PrismaService>(PrismaService)
  })

  beforeEach(async () => {
    await prisma.cleanDatabase()

    await prisma.user.create({
      data: {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        photoUrl: 'https://photo-url.com',
        provider: 'GOOGLE',
        email: 'john.doe@gmail.com',
        thirdPartyId: '211321342',
        currentRiddleId: null,
      },
    })

    await prisma.place.createMany({
      data: [
        {
          id: 1,
          createdAt: new Date(),
          name: 'Náměstí Svobody',
          lat: 50.087,
          lng: 14.42,
          answerPhotoUrl: 'https://answer-photo-url.com',
          riddlePhotoUrl: 'https://riddle-photo-url.com',
          authorId: 1
        },
        {
          id: 2,
          createdAt: new Date(),
          name: 'Jakubské náměstí',
          lat: 20.087,
          lng: 5.42,
          answerPhotoUrl: 'https://answer-photo-url.com',
          riddlePhotoUrl: 'https://riddle-photo-url.com',
          authorId: 1
        },
      ],
    })

    await prisma.riddle.createMany({
      data: [
        {
          id: 1,
          placeId: 1,
        },
        {
          id: 2,
          placeId: 2,
        },
      ],
    })


  })

  afterAll(async () => {
    await prisma.cleanDatabase()
    await module.close()
  })

  it('should be defined', () => {
    expect(riddleService).toBeDefined()
  })

  it('should return current riddle of user if user already has current riddle', async () => {
    const userId = 1

    await prisma.user.update({
      where: { id: userId },
      data: {
        currentRiddleId: 2,
      },
    })

    const riddle = await riddleService.getRiddleForUserId(userId)

    expect(riddle).toMatchObject({
      availability: { isAvailable: true },
      riddle: {
        id: 2,
        placeId: 2,
      },
    })
  })

  it('should generate new riddle if user doesnt have currentRiddleId', async () => {
    const riddleFindUniqueSpy = jest.spyOn(prisma.riddle, 'findUnique')

    const mockRiddle: IRiddleWithAvailability = {
      availability: { isAvailable: true },
      riddle: { id: 1 },
    }
    const generateRandomRiddleForUserMock = jest.spyOn(
      riddleService,
      'generateRandomRiddleForUser',
    )
    generateRandomRiddleForUserMock.mockResolvedValueOnce(mockRiddle)

    const riddle = await riddleService.getRiddleForUserId(1)

    expect(riddle).toMatchObject(mockRiddle)
    expect(riddleFindUniqueSpy).not.toHaveBeenCalled()
    expect(generateRandomRiddleForUserMock).toHaveBeenCalled()
  })

  it('should generate available riddle when only one is remaining', async () => {
    await prisma.answer.create({
      data: {
        id: 1,
        userId: 1,
        riddleId: 1,
      },
    })

    const riddleFindManySpy = jest.spyOn(prisma.riddle, 'findMany')

    const riddle = await riddleService.getRiddleForUserId(1)

    const user = await prisma.user.findUnique({ where: { id: 1 } })

    expect(riddleFindManySpy).toHaveBeenCalled()
    expect(riddle).toMatchObject({
      availability: { isAvailable: true },
      riddle: {
        id: 2,
        placeId: 2,
      },
    })
    expect(user).toHaveProperty('currentRiddleId', 2)
  })

  it('should return not available response when all riddles are answered', async () => {
    await prisma.answer.createMany({
      data: [
        {
          userId: 1,
          id: 1,
          riddleId: 1,
        },
        {
          userId: 1,
          id: 2,
          riddleId: 2,
        },
      ],
    })

    const riddleFindManySpy = jest.spyOn(prisma.riddle, 'findMany')

    const riddle = await riddleService.getRiddleForUserId(1)

    const user = await prisma.user.findUnique({ where: { id: 1 } })

    expect(riddleFindManySpy).toHaveBeenCalled()
    expect(riddle).toMatchObject({
      availability: { isAvailable: false },
    })
    expect(user).toHaveProperty('currentRiddleId', null)
  })
})
