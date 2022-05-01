import { Controller, HttpCode, HttpStatus } from '@nestjs/common'
import { GetCurrentUserId } from '~/auth/common/decorators/index'
import { IRiddle } from '~/interfaces/riddle.interface'
import { RiddleService } from '~/riddle/riddle.service'

@Controller('riddle')
export class RiddleController {
  constructor(private readonly riddleService: RiddleService) {}

  @HttpCode(HttpStatus.OK)
  async getRiddle(@GetCurrentUserId() userId: number): Promise<IRiddle> {
    return await this.riddleService.getRiddleForUserId(userId)
  }
}
