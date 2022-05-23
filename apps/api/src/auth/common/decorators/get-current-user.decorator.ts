import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const GetCurrentUser = createParamDecorator(
  (data: keyof any, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest()
    if (!data) return request.user
    return request.user[data]
  },
)
