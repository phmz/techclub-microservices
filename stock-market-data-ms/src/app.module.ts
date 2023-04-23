import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { AppController } from './app.controller';

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'stocks',
          type: 'topic',
        },
        {
          name: 'healthcheck',
          type: 'direct',
        },
      ],
      uri: 'amqp://rabbitmq:rabbitmq@localhost:5672',
      enableControllerDiscovery: true,
      connectionInitOptions: { wait: true },
    }),
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
