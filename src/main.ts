// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 👇 This tells Nest to serve files from the public/ folder
  app.useStaticAssets(join(__dirname, '..', 'public'));

  await app.listen(3000);
  console.log(`Server running on ${baseUrl}/qr.html`);
}
bootstrap();
