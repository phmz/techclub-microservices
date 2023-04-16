import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProductDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  price?: number;
}
