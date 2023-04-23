import { Module } from '@nestjs/common';
import { StocksService } from './stocks.service';
import { StocksGateway } from './stocks.gateway';

@Module({
  providers: [StocksService, StocksGateway],
})
export class StocksModule {}
