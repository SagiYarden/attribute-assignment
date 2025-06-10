export type Weather = {
  date: string;
  min_temp: number;
  max_temp: number;
};

export type WeatherResult = {
  from: string;
  to: string;
  data: Weather[];
};
