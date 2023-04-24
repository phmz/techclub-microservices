import { Injectable, Logger } from '@nestjs/common';
import { StockUpdate } from '../common/interface/stock-update.interface';
import { StocksGateway } from './stocks.gateway';

@Injectable()
export class StocksService {
  private readonly logger = new Logger(StocksService.name);
  private initialTimestamp = Date.now();

  private stocks: StockUpdate[] = [
    { symbol: 'AAPL', price: 15000, timestamp: this.initialTimestamp },
    { symbol: 'GOOG', price: 120000, timestamp: this.initialTimestamp },
    { symbol: 'MSFT', price: 30000, timestamp: this.initialTimestamp },
    { symbol: 'TSLA', price: 90000, timestamp: this.initialTimestamp },
  ];

  constructor(private readonly stocksGateway: StocksGateway) {
    this.generateMarketData();
  }

  updateStockPrice(stock: StockUpdate): void {
    const priceChange = Math.round((Math.random() * 100 - 50) * 100);
    stock.price = Math.max(stock.price + priceChange, 0);
    stock.timestamp = Date.now();
  }

  generateMarketData(): void {
    setInterval(() => {
      this.stocks.forEach((stock) => {
        this.updateStockPrice(stock);
        this.publishStockUpdate(stock);
      });
    }, 1000);
  }

  publishStockUpdate(stock: StockUpdate): void {
    this.stocksGateway.onStockUpdate(stock);
  }
}
