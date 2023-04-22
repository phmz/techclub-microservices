import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { Setting } from './interface/setting.interface';
import { UpsertSetting } from './dto/upsert-setting.dto';

@Injectable()
export class SettingsService {
  constructor(
    @Inject('SETTINGS_MANAGEMENT_SERVICE')
    private readonly settingsManagementClient: ClientProxy,
  ) {}

  findAll(): Observable<Setting[]> {
    return this.settingsManagementClient.send({ cmd: 'findAllSettings' }, {});
  }

  upsert(upsertSetting: UpsertSetting): Observable<boolean> {
    return this.settingsManagementClient.send(
      { cmd: 'upsertSetting' },
      upsertSetting,
    );
  }
}
