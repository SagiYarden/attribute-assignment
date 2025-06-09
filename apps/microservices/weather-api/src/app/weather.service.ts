import { Injectable } from '@nestjs/common';
import { GetWeatherDto } from './weather.dto';
import Database from 'better-sqlite3';
import { Weather } from '@monorepo/weather-interfaces';

@Injectable()
export class WeatherService {
  private db: InstanceType<typeof Database>;

  constructor() {
    this.db = new Database('weather.sqlite'); // path is relative to project root or use /data/weather.sqlite if needed
  }

  getDailyMinMax({ from, to }: GetWeatherDto): {
    from: string;
    to: string;
    data: Weather[];
  } {
    const now = new Date();
    const end = to ? new Date(to) : now;
    const start = from
      ? new Date(from)
      : new Date(end.getTime() - 30 * 24 * 60 * 60 * 1000);

    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);

    const startStr = start.toISOString();
    const endStr = end.toISOString();

    const stmt = this.db.prepare(`
      SELECT 
        DATE(time) AS day,
        MIN(temperature) AS min_temp,
        MAX(temperature) AS max_temp
      FROM temperature_hourly
      WHERE time BETWEEN ? AND ?
      GROUP BY day
      ORDER BY day ASC
    `);

    const data = stmt.all(startStr, endStr) as any;

    return {
      from: startStr,
      to: endStr,
      data,
    };
  }
}
