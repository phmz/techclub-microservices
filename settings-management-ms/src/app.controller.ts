import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { Setting } from './model/setting.entity';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'upsertSetting' })
  async upsertSetting({
    symbol,
    color,
  }: {
    color: string;
    symbol: string;
  }): Promise<boolean> {
    this.logger.debug(`Upserting setting with symbol: ${symbol}`);
    return this.appService.upsertSetting(symbol, color);
  }

  @MessagePattern({ cmd: 'findAllSettings' })
  async findAllSettings(): Promise<Setting[]> {
    this.logger.debug(`Finding all settings`);
    return this.appService.findAllSettings();
  }
}
