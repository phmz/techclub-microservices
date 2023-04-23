import { Module } from '@nestjs/common';
import { SharedModule } from '../shared.module';
import { SettingsController } from './settings.controller';
import { SettingsService } from './settings.service';

@Module({
  imports: [SharedModule],
  controllers: [SettingsController],
  providers: [SettingsService],
})
export class SettingsModule {}
