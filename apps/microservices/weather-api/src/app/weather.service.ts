import { Injectable } from '@nestjs/common';
import { GetWeatherDto } from './weather.dto';
import Database from 'better-sqlite3';
import { Weather, WeatherResult } from '@monorepo/weather-interfaces';
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

    // dynamic WHERE clause based on provided parameters
    let query = `
    SELECT
      city,
      DATE(time) AS date,
      MIN(temperature) AS min_temp,
      MAX(temperature) AS max_temp
    FROM
      temperature_hourly
    WHERE
      time BETWEEN ? AND ?
  `;
    const params = [startStr, endStr];

    if (city) {
      query += ` AND city = ?`;
      params.push(city);
    }

    query += `
    GROUP BY
      city,
      DATE(time)
    ORDER BY
      date
  `;

    const stmt = this.db.prepare(query);
    // execute the query with the parameters
    const data = stmt.all(...params) as Weather[];

    return {
      from: startStr,
      to: endStr,
      data,
    };
  }
}
