import { Box, Typography } from '@mui/material';
import { WeatherChart } from '../ui/weather-chart';

export const Home = () => {
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ textAlign: 'center', mb: 2 }}>
        <Typography
          variant="h3"
          gutterBottom
          fontWeight="bold"
          sx={{
            fontSize: { xs: '2rem', sm: '3rem', md: '3.5rem' },
            mb: 1,
          }}
        >
          Weather
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Stay updated with the latest weather charts.
        </Typography>
      </Box>

      <Box>
        <WeatherChart />
      </Box>
    </Box>
  );
};
