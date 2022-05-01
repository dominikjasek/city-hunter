import { Test, TestingModule } from '@nestjs/testing'
import { PrismaService } from '~/prisma/prisma.service'
import { RiddleService } from '~/riddle/riddle.service'
import { UsersService } from '~/users/users.service'
import { RiddleController } from './riddle.controller'

describe('RiddleController', () => {
  let controller: RiddleController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RiddleController],
      providers: [RiddleService, UsersService, PrismaService],
    }).compile()

    controller = module.get<RiddleController>(RiddleController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
