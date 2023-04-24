import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  private healths = new Map<string, string>([
    ['SMS', 'UNKNOWN'],
    ['SMP', 'UNKNOWN'],
  ]);
  private readonly logger = new Logger(AppService.name);

  constructor() {
    setInterval(async () => {
      this.healths.set('SMP', await this.getSockMarketDataHealth());
    }, 10000);
    setInterval(async () => {
      this.healths.set('SMS', await this.getSettingsManagementHealth());
    }, 10000);
  }

  async getSockMarketDataHealth(): Promise<string> {
    return new Promise((resolve) => {
      resolve('OK');
    });
  }

  async getSettingsManagementHealth(): Promise<string> {
    return new Promise((resolve) => {
      resolve('OK');
    });
  }

  getHealth(): Map<string, string> {
    return this.healths;
  }
}
