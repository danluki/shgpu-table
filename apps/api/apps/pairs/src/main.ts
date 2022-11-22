import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { PairsModule } from './pairs.module';
import { RmqService } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(PairsModule);
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);

  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('PAIRS'));

  await app.startAllMicroservices();
}
bootstrap();
