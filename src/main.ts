import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe(
    {
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    }
  ));
<<<<<<< HEAD
=======

>>>>>>> d7f0348d30ce93217293a2ee19f76950820ccc72
  console.log('I\'m master');
  await app.listen(3000);
}
bootstrap();
