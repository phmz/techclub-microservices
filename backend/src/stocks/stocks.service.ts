import { Injectable, Logger } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { StockUpdate } from '../common/interface/stock-update.interface';
import { StocksGateway } from './stocks.gateway';

@Injectable()
export class StocksService {
  private readonly logger = new Logger(StocksService.name);

  constructor(private readonly stocksGateway: StocksGateway) {}

  @RabbitSubscribe({
    exchange: 'stocks',
    routingKey: 'stock.update',
    queue: 'stock-market-data-ms/stock.update',
  })
  onStockUpdate(stock: StockUpdate) {
    this.stocksGateway.onStockUpdate(stock);
  }
}
