import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableVersioning({
    type: VersioningType.URI,
  });
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
  await app.listen(3000);
}
bootstrap();
