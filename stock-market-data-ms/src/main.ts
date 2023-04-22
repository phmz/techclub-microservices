// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppService } from './app.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const stockMarketDataService = app.get(AppService);
  stockMarketDataService.generateMarketData();
  await app.listen(3100);
}
bootstrap();
