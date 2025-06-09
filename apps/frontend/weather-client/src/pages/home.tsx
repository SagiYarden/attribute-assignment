import { useEffect, useRef, useState } from 'react';
import { Box, Grid, Typography, Button, Input, Skeleton } from '@mui/material';
import { usePaginatedQuotes } from '../hooks/use-paginated-quotes';
import { QuoteCard } from '../ui/quote-card';

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

    </Box>
  );
};
