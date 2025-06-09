import {
  Controller,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { WeatherService } from './weather.service';
import { GetWeatherDto } from './weather.dto';

@Controller('weather')
export class AppController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get('get-daily-min-max')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async getDailyMinMax(@Query() query: GetWeatherDto) {
    return this.weatherService.getDailyMinMax(query);
  }
}
