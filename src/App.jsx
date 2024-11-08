import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [selectedCity, setSelectedCity] = useState('');
  const [countries, setCountries] = useState([]);

  const fetchCapitals = async () => {
    try {
      const response = await fetch('https://restcountries.com/v3.1/all');
      const data = await response.json();

      const filteredCountries = data.filter(country => 
        country.capital && country.flags && country.capital[0].toLowerCase() !== 'jerusalem'
      );
      
      setCountries(filteredCountries);
    } catch (error) {
      console.error("Error fetching country data:", error);
    }
  };

  useEffect(() => {
    fetchCapitals();
  }, []);

  return (
    <div className="container">
      <h1>Country Capitals</h1>

      {countries.map((country, index) => (
        <div key={index} onClick={() => setSelectedCity(country.capital[0])}>
          <p>{country.name.common} - {country.capital[0]}</p>
        </div>
      ))}

      {/* <WeatherDisplay selectedCity={selectedCity} /> */}
    </div>
  );
}

export default App;
