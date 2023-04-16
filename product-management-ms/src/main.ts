import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
  );

  const logger = new Logger();
  logger.log(
    `${process.env.npm_package_name} v${process.env.npm_package_version} is running and listening to RabbitMQ on port 5672`,
    'bootstrap',
  );

  await app.listen();
}
bootstrap();