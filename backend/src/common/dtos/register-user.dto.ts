import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterUserDto {
  @IsString()
  @IsNotEmpty()
  readonly login: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  readonly password: string;
}
