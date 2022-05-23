import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, OpenAPIObject, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from '~/app.module'

async function bootstrap() {
  console.log(process.env.AUTH0_AUDIENCE)

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('newrelic')

  const app = await NestFactory.create(AppModule)
  app.enableCors({
    origin: process.env.WEB_APP_URL,
  })
  app.useGlobalPipes(new ValidationPipe())

  // Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('City hunter API')
    .setDescription('Documentation of the City hunter API')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      description: 'Please enter access token.',
      scheme: 'Bearer',
      bearerFormat: '',
      in: 'Header',
    })
    .build()
  const document: OpenAPIObject = SwaggerModule.createDocument(app, config)
  const options: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: 'City hunter API documentation',
  }
  SwaggerModule.setup('swagger', app, document, options)

  await app.listen(process.env.PORT || 8888)
}

bootstrap()
