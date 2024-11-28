import axios, { AxiosError } from 'axios';
import { WeatherData } from '../types/weather';
import { WEATHER_API } from '../config/constants';

export const getWeatherData = async (location: string): Promise<WeatherData> => {
  if (!location.trim()) {
    throw new Error('Please enter a location');
  }

  try {
    const response = await axios.get(`${WEATHER_API.BASE_URL}/forecast.json`, {
      params: {
        key: WEATHER_API.KEY,
        q: location,
        days: 7,
        aqi: 'no'
      }
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{ error?: { message?: string } }>;
      
      if (axiosError.response?.status === 401) {
        throw new Error('Invalid API key. Please check your WeatherAPI configuration.');
      }
      
      if (axiosError.response?.status === 400) {
        throw new Error('Location not found. Please try a different city name.');
      }

      if (axiosError.response?.data?.error?.message) {
        throw new Error(axiosError.response.data.error.message);
      }

      if (!navigator.onLine) {
        throw new Error('No internet connection. Please check your network and try again.');
      }
    }
    
    throw new Error('Unable to fetch weather data. Please try again later.');
  }
};