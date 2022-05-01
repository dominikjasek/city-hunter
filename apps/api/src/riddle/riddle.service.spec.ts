import { Test, TestingModule } from '@nestjs/testing'
import { PrismaService } from '~/prisma/prisma.service'
import { UsersService } from '~/users/users.service'
import { RiddleService } from './riddle.service'

describe('RiddleService', () => {
  let service: RiddleService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RiddleService, UsersService, PrismaService],
    }).compile()

    service = module.get<RiddleService>(RiddleService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
