# Weather-Analysis

A full-stack application for querying and visualizing historical weather data with date range filtering and city selection.

## 🚀 [Live Demo](https://attribute-assignment-client.onrender.com/)

- **Backend**: NestJS microservice querying a SQLite database of weather records, with smart filtering
- **Frontend**: React + Material UI + ChartJS client that displays weather data with customizable date ranges
- **Shared**: TypeScript interfaces for common Weather types in a monorepo structure

---

## Features

- 📅 **Date range selection** - Query weather data between specific dates (max to 31 days)
- 🌆 **City filtering** - Filter weather data by specific cities
- 📱 **Responsive design** - Works on mobile, tablet, and desktop
- ⚡ **Performance optimized** - Backend caching and frontend optimizations
- 📊 **Data visualization** - Clear presentation of weather patterns
- 🎨 **Material UI** - Modern, clean user interface

---

### Prerequisites

- Node.js ≥14
- npm (or npx)

---

### 1. Install dependencies

From the repo root:

```
npm install
```

---

### 2. Configure environment variables

2.1 Frontend:

Create a ".env" file at "apps/frontend/weather-client"

```
VITE_WEATHER_APP_BACKEND_URL=http://localhost:3000
```

---

### 3. Running the apps

3.1 Backend:

```
npm run server
```

3.2 Frontend:

```
npm run client
```

Open your browser at the address shown (default is http://localhost:4200/ )

---

### 4. How to use

#### API Endpoints

#### Get Weather Data:

```
GET /weather/get-daily-min-max
  ?city=<city-name>
  &from=<YYYY-MM-DD>
  &to=<YYYY-MM-DD>
```

Example:

```
http://localhost:3000/api/weather/get-daily-min-max?city=berlin&from=2025-02-04&to=2025-03-04
```

- city: The city to query weather data for
- from: Beginning of date range (format: YYYY-MM-DD)
- to: End of date range (format: YYYY-MM-DD)

### Frontend Usage

1. Enter a city name in the city input field
2. Select a start date using the first date picker
3. Select an end date using the second date picker (max 31 days from start date)
4. Click the "Search" button to query weather data
5. View the results displayed on the page

---
