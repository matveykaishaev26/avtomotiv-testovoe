import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { runSeed } from './seed/seed';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.CLIENT_URL ?? 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  await app.listen(process.env.BACKEND_PORT ?? 3000);
  await runSeed();
}

void bootstrap();
