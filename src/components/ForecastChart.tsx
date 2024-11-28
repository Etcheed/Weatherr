import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import { WeatherData } from '../types/weather';

interface ForecastChartProps {
  data: WeatherData;
}

export const ForecastChart: React.FC<ForecastChartProps> = ({ data }) => {
  const hourlyData = data.forecast.forecastday[0].hour.map(hour => ({
    time: format(new Date(hour.time), 'HH:mm'),
    temperature: hour.temp_c
  }));

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h3 className="text-xl font-semibold mb-4">24-Hour Forecast</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={hourlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis unit="°C" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="temperature"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};