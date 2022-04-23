import { NestFactory } from '@nestjs/core'
import { AppModule } from '~/app.module'

async function bootstrap() {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('newrelic')

  const app = await NestFactory.create(AppModule)
  app.enableCors({
    origin: process.env.WEB_APP_URL,
  })
  await app.listen(process.env.PORT || 8080)
}

bootstrap()
