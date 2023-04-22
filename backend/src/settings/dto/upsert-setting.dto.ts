import { IsNotEmpty, IsString } from 'class-validator';

export class UpsertSetting {
  @IsString()
  @IsNotEmpty()
  readonly color: string;

  @IsString()
  @IsNotEmpty()
  readonly symbol: string;
}
