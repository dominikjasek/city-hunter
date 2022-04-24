import { Test, TestingModule } from '@nestjs/testing'
import { AuthService } from '~/auth/auth.service'
import { JwtService } from '~/auth/strategy/jwt/jwt.service'
import { PrismaService } from '~/prisma/prisma.service'
import { UsersService } from '~/users/users.service'

describe('AuthService', () => {
  let service: AuthService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, UsersService, JwtService, PrismaService],
    }).compile()

    service = module.get<AuthService>(AuthService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
