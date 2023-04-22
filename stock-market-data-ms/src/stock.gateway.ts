import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { StockUpdate } from './common/interface/stock-update.interface';
import { Logger } from '@nestjs/common';

@WebSocketGateway({ cors: true })
export class StockGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(StockGateway.name);

  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket, ...args: any[]) {
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
