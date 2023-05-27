import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { getSwaggerConfig } from './configs/swagger.config';
import { AppModule } from './modules/app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: ['http://localhost:3000'],
    },
  });
  const configService = new ConfigService();
  app.useGlobalPipes(new ValidationPipe());
  getSwaggerConfig(app);
  await app.listen(configService.get('PORT'));
}
bootstrap();
