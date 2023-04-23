import { Controller, Logger } from '@nestjs/common';
import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';

@Controller('app')
export class AppController {
  private readonly logger = new Logger(AppController.name);

  @RabbitRPC({
    exchange: 'healthcheck',
    routingKey: 'healthcheck',
  })
  getHealth(): string {
    return 'OK';
  }
}
