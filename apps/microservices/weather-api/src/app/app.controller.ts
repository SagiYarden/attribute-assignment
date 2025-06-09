import {
  Controller,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherListDto } from './weather.dto';

@Controller('weather')
export class AppController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get('list')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async getQuotes(@Query() dto: WeatherListDto) {
    return this.weatherService.getWeather();
  }
}
