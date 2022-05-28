import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import * as jwt from 'express-jwt'
import { expressJwtSecret } from 'jwks-rsa'
import { promisify } from 'util'
import { PublicMetadataKey } from '~/auth/decorators/public.decorator'

@Injectable()
export class AuthorizationGuard implements CanActivate {
    private readonly AUTH0_AUDIENCE: string
    private readonly AUTH0_DOMAIN: string

    constructor(private reflector: Reflector) {
        this.AUTH0_AUDIENCE = process.env.AUTH0_AUDIENCE as string
        this.AUTH0_DOMAIN = process.env.AUTH0_DOMAIN as string
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride(PublicMetadataKey, [
            context.getHandler(),
            context.getClass(),
        ])

        if (isPublic) return true

        const req = context.getArgByIndex(0)
        const res = context.getArgByIndex(1)
        const checkJwt = promisify(
            jwt({
                secret: expressJwtSecret({
                    cache: true,
                    rateLimit: true,
                    jwksRequestsPerMinute: 5,
                    jwksUri: `${this.AUTH0_DOMAIN}.well-known/jwks.json`,
                }),
                audience: this.AUTH0_AUDIENCE,
                issuer: this.AUTH0_DOMAIN,
                algorithms: ['RS256'],
            }),
        )

        try {
            await checkJwt(req, res)
            return true
        } catch (error) {
            throw new UnauthorizedException(error)
        }
    }
}
