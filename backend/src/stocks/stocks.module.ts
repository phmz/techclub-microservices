import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { StocksService } from './stocks.service';
import { StocksGateway } from './stocks.gateway';

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'stocks',
          type: 'topic',
        },
      ],
      uri: 'amqp://rabbitmq:rabbitmq@localhost:5672',
      enableControllerDiscovery: true,
      connectionInitOptions: { wait: false },
    }),
  ],
  providers: [StocksService, StocksGateway],
})
export class StocksModule {}
