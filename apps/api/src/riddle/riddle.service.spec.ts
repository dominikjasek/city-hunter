import { Test, TestingModule } from '@nestjs/testing'
import { RiddleService } from './riddle.service'

describe('RiddleService', () => {
  let service: RiddleService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RiddleService],
    }).compile()

    service = module.get<RiddleService>(RiddleService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
