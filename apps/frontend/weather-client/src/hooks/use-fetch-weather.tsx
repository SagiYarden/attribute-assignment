import { ApiEndpoints,  WeatherResult } from "@monorepo/weather-interfaces";
import { useEnv } from "../providers/env-provider";
import axios from 'axios';

type FetchWeather = {
    from?: string;
    to?: string;
    city?: string;
}
export const useFetchWeather = ( ) => {
  const { backendUrl } = useEnv();

  const fetchWeather = async ({city,from,to}:FetchWeather) => {
      try {
        const url = `${backendUrl}/${ApiEndpoints.BASE}/${ApiEndpoints.LIST}`;
        const response = await axios.get(url,{params: { city, from, to } });
        return response.data as WeatherResult;
      } catch (error) {
        console.error('Error fetching the Weather:', error);
      }
        return undefined;
    };


  return { fetchWeather };

}