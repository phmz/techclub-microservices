import { Injectable, Logger } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { Setting } from './interface/setting.interface';
import { UpsertSetting } from './dto/upsert-setting.dto';

@Injectable()
export class SettingsService {
  private readonly logger = new Logger(SettingsService.name);

  findAll(): Observable<Setting[]> {
    return of([]);
  }

  upsert(upsertSetting: UpsertSetting): Observable<boolean> {
    this.logger.debug(
      `Upserting setting with symbol: ${upsertSetting.symbol} and color: ${upsertSetting.color}`,
    );
    return of(true);
  }
}
