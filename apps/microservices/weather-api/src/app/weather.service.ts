import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import axios from 'axios';
import { Weather } from '@monorepo/weather-interfaces';

@Injectable()
export class WeatherService {
  private readonly MAX_RETRIES = 3;
  private readonly RETRY_DELAY = 1000; // ms
  private readonly CACHE_TTL = 86400; // 24 hours

  constructor(
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) private cache: Cache
  ) {}

  async getWeather(
    count: number,
    page = 1,
    perPage = 25,
    tag?: string
  ): Promise<Weather> {
    return {} as any;
  }
}
