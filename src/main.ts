import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.use(cookieParser());
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  await app.listen(3001);
}
bootstrap();
