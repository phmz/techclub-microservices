import { Inject, Injectable, Logger } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { lastValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  private healths = new Map<string, string>([
    ['SMS', 'UNKNOWN'],
    ['SMP', 'UNKNOWN'],
  ]);
  private readonly logger = new Logger(AppService.name);

  constructor(
    private readonly amqpConnection: AmqpConnection,
    @Inject('SETTINGS_MANAGEMENT_SERVICE')
    private readonly settingsManagementClient: ClientProxy,
  ) {
    setInterval(async () => {
      this.healths.set('SMP', await this.getSockMarketDataHealth());
    }, 10000);
    setInterval(async () => {
      this.healths.set('SMS', await this.getSettingsManagementHealth());
    }, 10000);
  }

  async getSockMarketDataHealth(): Promise<string> {
    return this.amqpConnection
      .request<string>({
        exchange: 'healthcheck',
        routingKey: 'healthcheck',
      })
      .then((value) => value)
      .catch((err) => {
        this.logger.error(`Stock Market Data MS is down, reason: ${err}`);
        return 'KO';
      });
  }

  async getSettingsManagementHealth(): Promise<string> {
    return lastValueFrom(
      this.settingsManagementClient.send({ cmd: 'healthcheck' }, {}),
    )
      .then((value) => value)
      .catch((err) => {
        this.logger.error(`Settings Management MS is down, reason: ${err}`);
        return 'KO';
      });
  }

  getHealth(): Map<string, string> {
    return this.healths;
  }
}
