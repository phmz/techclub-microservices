import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Logger } from '@nestjs/common';
import { StockUpdate } from '../common/interface/stock-update.interface';

@WebSocketGateway({ cors: true })
export class StocksGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(StocksGateway.name);

  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  onStockUpdate(stockUpdate: StockUpdate) {
    this.logger.log(
      `Broadcasting stock update: ${JSON.stringify(stockUpdate)}`,
    );
    this.server.emit('stockUpdate', stockUpdate);
  }
}
