import { NestFactory } from '@nestjs/core'
import { AppModule } from '~/app.module'

async function bootstrap() {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const nr = require('newrelic')

  const app = await NestFactory.create(AppModule)
  await app.listen(process.env.PORT || 8080)
}

bootstrap()
