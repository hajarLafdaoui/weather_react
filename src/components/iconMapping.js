// iconMapping.js
import { faSun, faCloud, faCloudRain, faSnowflake, faSmog } from '@fortawesome/free-solid-svg-icons';

export const weatherIconMapping = {
  '01d': { icon: faSun, color: '#FFD700' },        // clear day
  '01n': { icon: faSun, color: '#FFD700' },        // clear night
  '02d': { icon: faCloud, color: '#B0C4DE' },      // few clouds day
  '02n': { icon: faCloud, color: '#B0C4DE' },      // few clouds night
  '03d': { icon: faCloud, color: '#C0C0C0' },      // scattered clouds
  '03n': { icon: faCloud, color: '#C0C0C0' },
  '04d': { icon: faCloud, color: '#808080' },      // broken clouds
  '04n': { icon: faCloud, color: '#808080' },
  '09d': { icon: faCloudRain, color: '#4682B4' },  // shower rain
  '09n': { icon: faCloudRain, color: '#4682B4' },
  '10d': { icon: faCloudRain, color: '#87CEEB' },  // rain
  '10n': { icon: faCloudRain, color: '#87CEEB' },
  '11d': { icon: faCloudRain, color: '#8B0000' },  // thunderstorm
  '11n': { icon: faCloudRain, color: '#8B0000' },
  '13d': { icon: faSnowflake, color: '#00BFFF' },  // snow
  '13n': { icon: faSnowflake, color: '#00BFFF' },
  '50d': { icon: faSmog, color: '#696969' },       // mist
  '50n': { icon: faSmog, color: '#696969' }
};
