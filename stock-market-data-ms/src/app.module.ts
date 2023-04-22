import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StockGateway } from './stock.gateway';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, StockGateway],
})
export class AppModule {}
