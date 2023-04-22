import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: 4000,
    },
  });

  const logger = new Logger();
  logger.log(
    `${process.env.npm_package_name} v${process.env.npm_package_version} is running on port 4000`,
    'bootstrap',
  );

  app.listen();
}
bootstrap();
