import { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  FormHelperText
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { useFetchWeather } from '../hooks/use-fetch-weather';
import { differenceInDays } from 'date-fns';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const LOCAL_STORAGE_KEY = 'weather-app-settings';

export const WeatherChart = () => {
  const [city, setCity] = useState('Berlin');
  const [from, setFrom] = useState<Date | null>(null);
  const [to, setTo] = useState<Date | null>(null);
  const [chartData, setData] = useState<any>();
  const [error, setError] = useState<string | null>(null);

  const { fetchWeather } = useFetchWeather();



  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      const { city, from, to } = JSON.parse(saved);
      if (city) setCity(city);
      if (from) setFrom(new Date(from));
      if (to) setTo(new Date(to));
      handleSearch(city, new Date(from), new Date(to));
    }
  }, []);


  const handleSearch = async (
    searchCity = city,
    fromDate = from,
    toDate = to
  ) => {
      if(!fromDate || !toDate) {
      setError(null);
      return;
    }

    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify({
        city: searchCity,
        from: fromDate?.toISOString(),
        to: toDate?.toISOString(),
      })
    );

    const res = await fetchWeather({
      city: searchCity,
      from: fromDate?.toISOString().split('T')[0],
      to: toDate?.toISOString().split('T')[0],
    });

    if (!res?.data) {
      console.error('No data returned from fetchWeather');
      return;
    }

    const data = res.data;

    const chartData = {
      labels: data.map((d) => d.date),
      datasets: [
        {
          label: 'Min Temp',
          data: data.map((d) => d.min_temp),
          borderColor: '#2196f3',
          backgroundColor: '#2196f355',
        },
        {
          label: 'Max Temp',
          data: data.map((d) => d.max_temp),
          borderColor: '#f44336',
          backgroundColor: '#f4433655',
        },
      ],
    };

    setData(chartData);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Paper sx={{ p: 3, mt: 4 }}>
        <Box display="flex" flexWrap="wrap" gap={2} alignItems="center">
          <TextField
            label="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />

          <DatePicker
            label="From"
            value={from}
            onChange={(newValue) => setFrom(newValue)}
            maxDate={to || undefined}
            disableFuture
          />

          <DatePicker
            label="To"
            value={to}
            onChange={(newValue) => setTo(newValue)}
            minDate={from || undefined}
            disableFuture
            shouldDisableDate={(date) =>
              from ? differenceInDays(date, from) > 31 : false
            }
          />

          <Button
            variant="contained"
            onClick={() => handleSearch()}
            disabled={!!error || !from || !to}
          >
            Search
          </Button>
        </Box>

        {error && (
          <FormHelperText error sx={{ mt: 1 }}>
            {error}
          </FormHelperText>
        )}

        {chartData && (
          <Box mt={4}>
            <Typography variant="h6" mb={2}>
              Daily Min/Max Temperatures
            </Typography>
            <Line data={chartData} />
          </Box>
        )}
      </Paper>
    </LocalizationProvider>
  );
};
