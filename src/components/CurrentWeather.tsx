import React from 'react';
import { Thermometer, Wind, Droplets } from 'lucide-react';
import { WeatherData } from '../types/weather';

interface CurrentWeatherProps {
  data: WeatherData;
}

export const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            {data.location.name}, {data.location.country}
          </h2>
          <p className="text-gray-600">{data.current.condition.text}</p>
        </div>
        <img
          src={`https:${data.current.condition.icon}`}
          alt={data.current.condition.text}
          className="w-16 h-16"
        />
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="flex items-center space-x-2">
          <Thermometer className="text-blue-500" />
          <div>
            <p className="text-3xl font-bold">{data.current.temp_c}°C</p>
            <p className="text-sm text-gray-600">Feels like {data.current.feelslike_c}°C</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Wind className="text-blue-500" />
          <div>
            <p className="text-lg">{data.current.wind_kph} km/h</p>
            <p className="text-sm text-gray-600">Wind Speed</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Droplets className="text-blue-500" />
          <div>
            <p className="text-lg">{data.current.humidity}%</p>
            <p className="text-sm text-gray-600">Humidity</p>
          </div>
        </div>
      </div>
    </div>
  );
};