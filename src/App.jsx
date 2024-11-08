import React, { useEffect, useState } from 'react';
import WeatherDisplay from './components/WeatherDisplay';
import './App.css';

function App() {
  const [selectedCity, setSelectedCity] = useState('');
  const [countries, setCountries] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

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

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleSelectCountry = (capital) => {
    setSelectedCity(capital);
    setDropdownOpen(false); // Close the dropdown after selecting
  };

  return (
    <div className="container">
      <h1>Select a Country to See its Capital and Weather</h1>

      {/* Custom Dropdown */}
      <div className="dropdown">
        <button className="dropdown-btn" onClick={toggleDropdown}>
          {selectedCity ? selectedCity : 'Select a Country'}
        </button>

        {dropdownOpen && (
          <div className="dropdown-menu">
            {countries.map((country, index) => (
              <div 
                key={index} 
                className="dropdown-item" 
                onClick={() => handleSelectCountry(country.capital[0])}
              >
                <img 
                  src={country.flags[0]} 
                  alt={country.name.common} 
                  width="20" 
                  height="15" 
                  className="flag-img"
                />
                <span>{country.name.common} - {country.capital[0]}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Only render WeatherDisplay if a city is selected */}
      {selectedCity && <WeatherDisplay selectedCity={selectedCity} />}
    </div>
  );
}

export default App;
