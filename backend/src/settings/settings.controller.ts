import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ApiTags } from '@nestjs/swagger';
import { SettingsService } from './settings.service';
import { Setting } from './interface/setting.interface';
import { UpsertSetting } from './dto/upsert-setting.dto';

@ApiTags('settings')
@Controller('settings')
export class SettingsController {
  private readonly logger = new Logger(SettingsController.name);

  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  findAll(): Observable<Setting[]> {
    this.logger.debug('Getting all settings');
    return this.settingsService.findAll();
  }

  @Post()
  upsert(@Body() upsertSetting: UpsertSetting): void {
    this.logger.debug(
      `Upserting setting with symbol: ${upsertSetting.symbol} and color: ${upsertSetting.color}`,
    );
    this.settingsService.upsert(upsertSetting).subscribe({
      error: (error) => {
        this.logger.error(`Error upserting setting: ${error}`);
      },
    });
  }
}
