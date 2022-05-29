import { CanActivate, ExecutionContext, Injectable, UseGuards } from '@nestjs/common'
import { UserPermission } from '@shared/types/Auth/Auth.types'

@Injectable()
export class PermissionGuard implements CanActivate {
    constructor(private readonly permission: UserPermission) {
    }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> {
        const { user } = context.switchToHttp().getRequest()
        return user.permissions.includes(this.permission)
    }
}

export const RequiredPermission = (permission: UserPermission) => UseGuards(new PermissionGuard(permission))
