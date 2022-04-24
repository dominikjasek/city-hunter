import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { IJwtPayloadWithRt } from '~/auth/types/JwtPayload.type'

export const GetCurrentUser = createParamDecorator(
  (data: keyof IJwtPayloadWithRt | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest()
    if (!data) return request.user
    return request.user[data]
  },
)
