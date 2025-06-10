// src/weather/dto/weather.dto.ts
import { IsISO8601, IsOptional, IsString } from 'class-validator';

export class GetWeatherDto {
  @IsString()
  city?: string;

  @IsOptional()
  @IsISO8601()
  from?: string;

  @IsOptional()
  @IsISO8601()
  to?: string;
}
