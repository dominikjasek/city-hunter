import { Test, TestingModule } from '@nestjs/testing'
import { RiddleController } from './riddle.controller'

describe('RiddleController', () => {
  let controller: RiddleController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RiddleController],
    }).compile()

    controller = module.get<RiddleController>(RiddleController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
