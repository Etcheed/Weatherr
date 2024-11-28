import React from 'react';
import { format } from 'date-fns';
import { WeatherData } from '../types/weather';

interface WeeklyForecastProps {
  data: WeatherData;
}

export const WeeklyForecast: React.FC<WeeklyForecastProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-4">7-Day Forecast</h3>
      <div className="grid grid-cols-2 md:grid-cols-7 gap-4">
        {data.forecast.forecastday.map((day) => (
          <div
            key={day.date}
            className="flex flex-col items-center p-3 rounded-lg bg-gray-50"
          >
            <p className="font-medium">{format(new Date(day.date), 'EEE')}</p>
            <img
              src={`https:${day.day.condition.icon}`}
              alt={day.day.condition.text}
              className="w-12 h-12 my-2"
            />
            <div className="text-sm">
              <span className="font-medium">{Math.round(day.day.maxtemp_c)}°</span>
              <span className="text-gray-500 ml-1">{Math.round(day.day.mintemp_c)}°</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};