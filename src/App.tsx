import React, { useState } from 'react';
import { Cloud, AlertCircle } from 'lucide-react';
import { SearchBar } from './components/SearchBar';
import { CurrentWeather } from './components/CurrentWeather';
import { ForecastChart } from './components/ForecastChart';
import { WeeklyForecast } from './components/WeeklyForecast';
import { getWeatherData } from './services/api';
import { WeatherData } from './types/weather';

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (location: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getWeatherData(location);
      setWeatherData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center mb-8">
          <Cloud className="w-8 h-8 text-blue-500 mr-2" />
          <h1 className="text-3xl font-bold text-gray-800">Weather Forecast</h1>
        </div>

        <div className="flex justify-center mb-8">
          <SearchBar onSearch={handleSearch} />
        </div>

        {loading && (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          </div>
        )}

        {error && (
          <div className="flex items-center justify-center gap-2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6 max-w-md mx-auto">
            <AlertCircle className="h-5 w-5" />
            <p>{error}</p>
          </div>
        )}

        {weatherData && (
          <div>
            <CurrentWeather data={weatherData} />
            <ForecastChart data={weatherData} />
            <WeeklyForecast data={weatherData} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;