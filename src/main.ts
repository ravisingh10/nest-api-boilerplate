import 'dotenv/config'
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import { resolve } from 'path'
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setBaseViewsDir([
    resolve(__dirname, 'views'),
  ])
  app.setViewEngine('ejs')
  app.use(cookieParser(process.env.ENCRYPTION_KEY));
  await app.listen(3000);
}
bootstrap();
