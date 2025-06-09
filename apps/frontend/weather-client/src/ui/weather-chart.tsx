import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper
} from '@mui/material';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Weather } from '@monorepo/weather-interfaces';
import { useFetchWeather } from '../hooks/use-fetch-weather';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export const WeatherChart = () => {
  const [city, setCity] = useState('');
  const [chartData, setData] = useState<any>();
  const {fetchWeather} =useFetchWeather()

  const handleSearch = async () => {
    const res =  await fetchWeather({city, from: undefined, to: undefined});
    if (!res?.data) {
      console.error("No data returned from fetchWeather");
      return;
    }
    const data = res.data;

      const chartData = {
    labels: data?.map((d) => d.date),
    datasets: [
      {
        label: 'Min Temp',
        data: data?.map((d) => d.min_temp),
        borderColor: '#2196f3',
        backgroundColor: '#2196f355',
      },
      {
        label: 'Max Temp',
        data: data?.map((d) => d.max_temp),
        borderColor: '#f44336',
        backgroundColor: '#f4433655',
      },
    ],
  };
    setData(chartData);

  };




  return (
    <Paper sx={{ p: 3, mt: 4 }}>
      <Box display="flex" gap={2} alignItems="center">
        <TextField
          label="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <Button variant="contained" onClick={handleSearch}>
          Search
        </Button>
      </Box>

      {chartData && (
        <Box mt={4}>
          <Typography variant="h6" mb={2}>Daily Min/Max Temperatures</Typography>
          <Line data={chartData} />
        </Box>
      )}
    </Paper>
  );
};