import { Test, TestingModule } from '@nestjs/testing'
import { Prisma } from '@prisma/client'
import { AppModule } from '~/app.module'
import { AuthService } from '~/auth/auth.service'
import { PrismaService } from '~/prisma/prisma.service'

const userCreateObj: Prisma.UserCreateArgs = {
  data: {
    email: 'test@gmail.com',
    firstName: 'John',
    lastName: 'Doe',
    photoUrl: 'https://test.com',
    provider: 'GOOGLE',
    thirdPartyId: 'test',
  },
}

describe('Auth Flow', () => {
  let prisma: PrismaService
  let authService: AuthService
  let moduleRef: TestingModule

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    prisma = moduleRef.get(PrismaService)
    authService = moduleRef.get(AuthService)
  })

  afterAll(async () => {
    await moduleRef.close()
  })

  it('should be defined', () => {
    expect(authService).toBeDefined()
  })

  describe('signin', () => {
    beforeAll(async () => {
      await prisma.cleanDatabase()
    })

    it('should login', async () => {
      const tokens = await authService.loginWithOAuth(userCreateObj)

      expect(tokens.access_token).toBeTruthy()
      expect(tokens.refresh_token).toBeTruthy()
    })
  })

  // describe('logout', () => {
  //   beforeAll(async () => {
  //     await prisma.cleanDatabase()
  //   })
  //
  //   it('should pass if call to non existent user', async () => {
  //     const result = await authService.logout(4)
  //     expect(result).toBeDefined()
  //   })
  //
  //   it('should logout', async () => {
  //     await authService.loginWithOAuth(userCreateObj)
  //
  //     let userFromDb: User | null
  //
  //     userFromDb = await prisma.user.findFirst({
  //       where: {
  //         email: userCreateObj.data.email,
  //       },
  //     })
  //     expect(userFromDb?.refreshToken).toBeTruthy()
  //     expect(userFromDb).not.toBeNull()
  //
  //     // logout
  //     await authService.logout(userFromDb!.id)
  //
  //     userFromDb = await prisma.user.findFirst({
  //       where: {
  //         email: userCreateObj.data.email,
  //       },
  //     })
  //
  //     expect(userFromDb?.refreshToken).toBeNull()
  //   })
  // })
  //
  // describe('refresh', () => {
  //   beforeAll(async () => {
  //     await prisma.cleanDatabase()
  //   })
  //
  //   it('should throw if no existing user', async () => {
  //     let tokens: ITokens | undefined
  //     try {
  //       tokens = await authService.refreshTokens(1, '')
  //     } catch (error: any) {
  //       expect(error.status).toBe(403)
  //     }
  //
  //     expect(tokens).toBeUndefined()
  //   })
  //
  //   it('should throw if user logged out', async () => {
  //     // signup and save refresh token
  //     const _tokens = await authService.loginWithOAuth(userCreateObj)
  //
  //     const rt = _tokens.refresh_token
  //
  //     // get user id from refresh token
  //     // also possible to get using prisma like above
  //     // but since we have the rt already, why not just decoding it
  //     const decoded = decode(rt)
  //     const userId = Number(decoded?.sub)
  //
  //     // logout the user so the hashedRt is set to null
  //     await authService.logout(userId)
  //
  //     let tokens: ITokens | undefined
  //     try {
  //       tokens = await authService.refreshTokens(userId, rt)
  //     } catch (error: any) {
  //       expect(error.status).toBe(403)
  //     }
  //
  //     expect(tokens).toBeUndefined()
  //   })
  //
  //   it('should throw if refresh token incorrect', async () => {
  //     const _tokens = await authService.loginWithOAuth(userCreateObj)
  //     console.log({
  //       _tokens,
  //     })
  //
  //     const rt = _tokens.refresh_token
  //
  //     const decoded = decode(rt)
  //     const userId = Number(decoded?.sub)
  //
  //     let tokens: ITokens | undefined
  //     try {
  //       tokens = await authService.refreshTokens(userId, rt + 'a')
  //     } catch (error: any) {
  //       expect(error.status).toBe(403)
  //     }
  //
  //     expect(tokens).toBeUndefined()
  //   })
  //
  //   it('should refresh tokens', async () => {
  //     await prisma.cleanDatabase()
  //     // log in the user again and save rt + at
  //     const _tokens = await authService.loginWithOAuth(userCreateObj)
  //
  //     const rt = _tokens.refresh_token
  //     const at = _tokens.access_token
  //
  //     const decoded = decode(rt)
  //     const userId = Number(decoded?.sub)
  //
  //     // since jwt uses seconds signature we need to wait for 1 second to have new jwts
  //     await new Promise((resolve, reject) => {
  //       setTimeout(() => {
  //         resolve(true)
  //       }, 1000)
  //     })
  //
  //     const tokens = await authService.refreshTokens(userId, rt)
  //     expect(tokens).toBeDefined()
  //
  //     // refreshed tokens should be different
  //     expect(tokens.access_token).not.toBe(at)
  //     expect(tokens.refresh_token).not.toBe(rt)
  //   })
  // })
})
