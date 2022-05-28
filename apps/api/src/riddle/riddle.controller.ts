import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common'
import { IRiddleWithAvailability } from '@shared/types/Riddle/Riddle.types'
import { GetCurrentUserId } from '~/auth/decorators/get-current-user-id.decorator'
import { RiddleService } from '~/riddle/riddle.service'

@Controller('riddle')
export class RiddleController {
    constructor(private readonly riddleService: RiddleService) {
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async getRiddle(
        @GetCurrentUserId() userId: string,
    ): Promise<IRiddleWithAvailability> {
        return await this.riddleService.getRiddleForUserId(userId)
    }
}
