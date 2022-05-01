import { Test, TestingModule } from '@nestjs/testing'
import { AppController } from '~/app.controller'
import { AppService } from '~/app.service'
import { PrismaService } from '~/prisma/prisma.service'

describe('AppController', () => {
  let appController: AppController

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, PrismaService],
    }).compile()

    appController = app.get<AppController>(AppController)
  })

  describe('root', () => {
    it('ping should return pong', () => {
      const expectedResult = { data: 'pong' }
      expect(appController.ping()).toMatchObject(expectedResult)
    })
  })
})
