import { Injectable } from '@nestjs/common';
import { GetWeatherDto } from './weather.dto';
import Database from 'better-sqlite3';
import {
  Weather,
  WeatherResult,
  validateDateRange,
} from '@monorepo/weather-interfaces';
import path from 'path';

@Injectable()
export class WeatherService {
  private db: InstanceType<typeof Database>;

  constructor() {
    const dbPath = path.join(__dirname, 'weather.db');
    this.db = new Database(dbPath);
  }

  getDailyMinMax({ from, to, city }: GetWeatherDto): WeatherResult {
    const now = new Date();
    const end = to ? new Date(to) : now;
    const start = from
      ? new Date(from)
      : new Date(end.getTime() - 30 * 24 * 60 * 60 * 1000); // Default to last 30 days

    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);

    const startStr = start.toISOString();
    const endStr = end.toISOString();
    const isValidDateRange = validateDateRange(startStr, endStr);
    if (isValidDateRange) {
      throw new Error(isValidDateRange);
    }
    // Normalize city name to CamelCase (e.g., "berlin" -> "Berlin", new york -> "New York")
    const cityCamelCase = city
      ? city
          .split(' ')
          .map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          )
          .join(' ')
      : 'Berlin';

    // dynamic WHERE clause based on provided parameters
    const query = `
    SELECT
      city,
      STRFTIME('%Y-%m-%d', time) AS date,
      MAX(CAST(temperature AS REAL)) AS max_temp,
      MIN(CAST(temperature AS REAL)) AS min_temp
    FROM
      temperature_hourly
    WHERE
      time BETWEEN ? AND ?
    AND city = ?
    GROUP BY
      city,
      STRFTIME('%Y-%m-%d', time)
    ORDER BY
      date
  `;
    const params = [startStr, endStr, cityCamelCase];

    const data = this.db.prepare(query).all(...params) as Weather[];

    return {
      from: startStr,
      to: endStr,
      data,
    };
  }
}
