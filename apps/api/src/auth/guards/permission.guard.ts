import { CanActivate, ExecutionContext, Injectable, UseGuards } from '@nestjs/common'
import { Permission } from '@shared/types/Auth/Auth.types'

@Injectable()
export class PermissionGuard implements CanActivate {
    constructor(private readonly permission: Permission) {
    }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> {
        const { user } = context.switchToHttp().getRequest()
        return user.permissions.includes(this.permission)
    }
}

export const RequiredPermission = (permission: Permission) => UseGuards(new PermissionGuard(permission))
