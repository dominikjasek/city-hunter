import {INestApplication, Injectable, OnModuleInit} from '@nestjs/common'
import {PrismaClient} from '@prisma/client'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect()
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close()
    })
  }

  async cleanDatabase() {
    if (process.env.NODE_ENV === 'production') return

    // teardown logic
    const prismaCleanUp = [
      this.answer.deleteMany(),
      this.riddle.deleteMany(),
      this.place.deleteMany(),
      this.user.deleteMany(),
    ]

    await this.$transaction(prismaCleanUp)
    await this.$disconnect()
  }
}
