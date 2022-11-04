import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('SHGPU API')
    .setDescription('The SHGPU API documentation')
    .setVersion('1.0.0')
    .addTag('pairs')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      enableDebugMessages: true,
      transform: true,
    }),
  );

  const microservices = app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'tables_queue',
      queueOptions: {
        durable: true,
      },
    },
  });
  app.enableVersioning({
    type: VersioningType.URI,
  });

  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
