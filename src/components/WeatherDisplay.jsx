import React, { useEffect, useState } from 'react';

const WeatherDisplay = ({ selectedCity }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  const apiKey = '9060bd1d3a6fb963d29e880953d842ed';
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=${apiKey}&units=metric`;

  const getWeatherData = async () => {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('City not found');
      }
      const data = await response.json();
      setWeather(data);
      setLoading(false);
    } catch (error) {
      setError(error.message); // Set the error message
      setLoading(false); // Stop loading even if there's an error
    }
  };

  useEffect(() => {
    setError(null); 
    getWeatherData();
  }, [selectedCity]);

  if (loading) {
    return <p>Loading weather data...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Weather in {selectedCity}</h1>
      {weather && weather.main ? (
        <>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Weather: {weather.weather[0].description}</p>
        </>
      ) : (
        <p>No weather data available</p>
      )}
    </div>
  );
};

export default WeatherDisplay;
