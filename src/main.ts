import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { Settings } from 'luxon';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
Settings.defaultZone = 'UTC+1';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false,
    }),
  );
  app.setBaseViewsDir([
    join(__dirname, '..',  '/upload/views'),
  ]);
  app.setViewEngine('hbs');
  app.setGlobalPrefix('api/v1');
  const config = new DocumentBuilder()
    .setTitle('Authentication Project')
    .setDescription('Authentication Project')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/v1/docs', app, document);
    app.use(helmet());
  
    const port = process.env.PORT || 3010;
    console.log(`Listening on port ${port}`); // Log the port number for debugging
    await app.listen(port);
  }
bootstrap();
