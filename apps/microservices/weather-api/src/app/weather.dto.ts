// src/weather/dto/weather.dto.ts
import { IsISO8601, IsOptional } from 'class-validator';

export class GetWeatherDto {
  @IsOptional()
  @IsISO8601()
  from?: string;

  @IsOptional()
  @IsISO8601()
  to?: string;
}
