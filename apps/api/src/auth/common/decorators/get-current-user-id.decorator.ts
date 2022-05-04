import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { IJwtPayload } from '~/auth/types/auth.type'

export const GetCurrentUserId = createParamDecorator(
  (_: undefined, context: ExecutionContext): number => {
    const request = context.switchToHttp().getRequest()
    const user = request.user as IJwtPayload
    return user.sub
  },
)
