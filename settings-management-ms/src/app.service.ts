import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Setting } from './model/setting.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Setting)
    private readonly settingRepository: Repository<Setting>,
  ) {}

  async upsertSetting(symbol: string, color: string): Promise<boolean> {
    const setting = await this.settingRepository.upsert(
      {
        symbol,
        color,
      },
      ['symbol'],
    );

    return setting !== undefined;
  }

  async findAllSettings(): Promise<Setting[]> {
    return this.settingRepository.find();
  }
}
