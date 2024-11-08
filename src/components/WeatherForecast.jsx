import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { weatherIconMapping } from './iconMapping';

const WeatherForecast = ({ selectedCity }) => {
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiKey = '9060bd1d3a6fb963d29e880953d842ed';
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${selectedCity}&appid=${apiKey}&units=metric`;

  const getForecastData = async () => {
    try {
      const response = await fetch(forecastUrl);
      if (!response.ok) {
        throw new Error('City not found');
      }
      const data = await response.json();
      setForecast(data.list);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    setError(null);
    getForecastData();
  }, [selectedCity]);

  if (loading) {
    return <p>Loading forecast...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const uniqueDays = [];
  const seenDays = new Set();

  forecast.forEach((forecastData) => {
    const forecastDate = new Date(forecastData.dt * 1000).toLocaleDateString();
    if (!seenDays.has(forecastDate)) {
      seenDays.add(forecastDate);
      uniqueDays.push(forecastData);
    }
  });

  return (
    <div>
      <h2>5-Day Forecast for {selectedCity}</h2>
      <div className="forecast">
        {uniqueDays.slice(0, 5).map((forecastData, index) => {
          const iconCode = forecastData.weather[0].icon;
          const { icon, color } = weatherIconMapping[iconCode] || {};

          return (
            <div key={index} className="forecast-item">
              <p>{new Date(forecastData.dt * 1000).toLocaleDateString()}</p>
              <p>{forecastData.main.temp}°</p>
              <p>{forecastData.weather[0].description}</p>
              {icon && (
                <FontAwesomeIcon icon={icon} color={color} size="2x" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeatherForecast;
