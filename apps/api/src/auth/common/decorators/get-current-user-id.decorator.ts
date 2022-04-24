import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { IJwtPayload } from '~/auth/types/JwtPayload.type'

export const GetCurrentUserId = createParamDecorator(
  (_: undefined, context: ExecutionContext): number => {
    const request = context.switchToHttp().getRequest()
    const user = request.user as IJwtPayload
    return user.sub
  },
)
