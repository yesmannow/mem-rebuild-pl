/**
 * API Integration Scripts
 * Sample fetch functions for chosen public APIs
 */

// Base configuration
const API_CONFIG = {
  weather: {
    baseUrl: 'https://api.open-meteo.com/v1',
    defaultLocation: { latitude: 37.7749, longitude: -122.4194 } // San Francisco
  },
  currency: {
    baseUrl: 'https://api.frankfurter.app'
  },
  funFacts: {
    baseUrl: 'https://uselessfacts.jsph.pl'
  },
  ipGeo: {
    baseUrl: 'https://ipapi.co'
  },
  qrCode: {
    baseUrl: 'https://api.qrserver.com/v1'
  }
};

/**
 * Fetch current weather data
 * @param {number} latitude - Location latitude
 * @param {number} longitude - Location longitude
 * @returns {Promise<Object>} Weather data
 */
export async function fetchWeather(latitude, longitude) {
  const lat = latitude || API_CONFIG.weather.defaultLocation.latitude;
  const lon = longitude || API_CONFIG.weather.defaultLocation.longitude;
  
  try {
    const response = await fetch(
      `${API_CONFIG.weather.baseUrl}/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,precipitation_probability`
    );
    
    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    return {
      temperature: data.current_weather.temperature,
      windSpeed: data.current_weather.windspeed,
      weatherCode: data.current_weather.weathercode,
      time: data.current_weather.time,
      hourly: data.hourly
    };
  } catch (error) {
    console.error('Error fetching weather:', error);
    throw error;
  }
}

/**
 * Fetch currency exchange rates
 * @param {string} base - Base currency code (default: EUR)
 * @returns {Promise<Object>} Exchange rates
 */
export async function fetchCurrencyRates(base = 'EUR') {
  try {
    const url = base === 'EUR' 
      ? `${API_CONFIG.currency.baseUrl}/latest`
      : `${API_CONFIG.currency.baseUrl}/latest?from=${base}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Currency API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    return {
      base: data.base,
      date: data.date,
      rates: data.rates
    };
  } catch (error) {
    console.error('Error fetching currency rates:', error);
    throw error;
  }
}

/**
 * Convert currency amount
 * @param {number} amount - Amount to convert
 * @param {string} from - Source currency code
 * @param {string} to - Target currency code
 * @returns {Promise<Object>} Conversion result
 */
export async function convertCurrency(amount, from, to) {
  try {
    const response = await fetch(
      `${API_CONFIG.currency.baseUrl}/latest?amount=${amount}&from=${from}&to=${to}`
    );
    
    if (!response.ok) {
      throw new Error(`Currency conversion error: ${response.status}`);
    }
    
    const data = await response.json();
    
    return {
      amount: data.amount,
      base: data.base,
      date: data.date,
      rates: data.rates
    };
  } catch (error) {
    console.error('Error converting currency:', error);
    throw error;
  }
}

/**
 * Fetch a random fun fact
 * @param {string} language - Language code (default: en)
 * @returns {Promise<Object>} Fun fact data
 */
export async function fetchFunFact(language = 'en') {
  try {
    const response = await fetch(
      `${API_CONFIG.funFacts.baseUrl}/random.json?language=${language}`
    );
    
    if (!response.ok) {
      throw new Error(`Fun facts API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    return {
      id: data.id,
      text: data.text,
      source: data.source,
      sourceUrl: data.source_url,
      language: data.language
    };
  } catch (error) {
    console.error('Error fetching fun fact:', error);
    throw error;
  }
}

/**
 * Fetch today's fun fact
 * @param {string} language - Language code (default: en)
 * @returns {Promise<Object>} Today's fun fact
 */
export async function fetchTodaysFact(language = 'en') {
  try {
    const response = await fetch(
      `${API_CONFIG.funFacts.baseUrl}/today.json?language=${language}`
    );
    
    if (!response.ok) {
      throw new Error(`Fun facts API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    return {
      id: data.id,
      text: data.text,
      source: data.source,
      sourceUrl: data.source_url,
      language: data.language
    };
  } catch (error) {
    console.error('Error fetching today\'s fact:', error);
    throw error;
  }
}

/**
 * Fetch IP geolocation data
 * @param {string} ip - IP address (optional, uses client IP if not provided)
 * @returns {Promise<Object>} Geolocation data
 */
export async function fetchIPGeolocation(ip = null) {
  try {
    const url = ip 
      ? `${API_CONFIG.ipGeo.baseUrl}/${ip}/json/`
      : `${API_CONFIG.ipGeo.baseUrl}/json/`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`IP Geolocation API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    return {
      ip: data.ip,
      city: data.city,
      region: data.region,
      country: data.country_name,
      countryCode: data.country_code,
      latitude: data.latitude,
      longitude: data.longitude,
      timezone: data.timezone,
      currency: data.currency
    };
  } catch (error) {
    console.error('Error fetching IP geolocation:', error);
    throw error;
  }
}

/**
 * Generate QR code URL
 * @param {string} data - Data to encode in QR code
 * @param {Object} options - QR code options
 * @returns {string} QR code image URL
 */
export function generateQRCodeURL(data, options = {}) {
  const {
    size = 200,
    format = 'png',
    color = '000000',
    bgcolor = 'ffffff',
    margin = 1
  } = options;
  
  const params = new URLSearchParams({
    data: data,
    size: `${size}x${size}`,
    format: format,
    color: color,
    bgcolor: bgcolor,
    margin: margin
  });
  
  return `${API_CONFIG.qrCode.baseUrl}/create-qr-code/?${params.toString()}`;
}

/**
 * Helper function to get weather description from code
 * @param {number} code - Weather code
 * @returns {string} Weather description
 */
export function getWeatherDescription(code) {
  const descriptions = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Foggy',
    48: 'Depositing rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    71: 'Slight snow',
    73: 'Moderate snow',
    75: 'Heavy snow',
    77: 'Snow grains',
    80: 'Slight rain showers',
    81: 'Moderate rain showers',
    82: 'Violent rain showers',
    85: 'Slight snow showers',
    86: 'Heavy snow showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with slight hail',
    99: 'Thunderstorm with heavy hail'
  };
  
  return descriptions[code] || 'Unknown';
}

/**
 * Helper function to get weather emoji from code
 * @param {number} code - Weather code
 * @returns {string} Weather emoji
 */
export function getWeatherEmoji(code) {
  if (code === 0) return '☀️';
  if (code <= 3) return '⛅';
  if (code <= 48) return '🌫️';
  if (code <= 55) return '🌦️';
  if (code <= 65) return '🌧️';
  if (code <= 77) return '❄️';
  if (code <= 82) return '🌧️';
  if (code <= 86) return '🌨️';
  return '⛈️';
}

// Example usage demonstrations
export const examples = {
  weather: async () => {
    const weather = await fetchWeather();
    console.log('Current weather:', weather);
  },
  
  currency: async () => {
    const rates = await fetchCurrencyRates('USD');
    console.log('Exchange rates:', rates);
    
    const converted = await convertCurrency(100, 'USD', 'EUR');
    console.log('Converted amount:', converted);
  },
  
  funFact: async () => {
    const fact = await fetchFunFact();
    console.log('Random fact:', fact.text);
    
    const todayFact = await fetchTodaysFact();
    console.log('Today\'s fact:', todayFact.text);
  },
  
  geolocation: async () => {
    const location = await fetchIPGeolocation();
    console.log('Your location:', location);
  },
  
  qrCode: () => {
    const url = generateQRCodeURL('https://example.com', { size: 300 });
    console.log('QR Code URL:', url);
  }
};

export default {
  fetchWeather,
  fetchCurrencyRates,
  convertCurrency,
  fetchFunFact,
  fetchTodaysFact,
  fetchIPGeolocation,
  generateQRCodeURL,
  getWeatherDescription,
  getWeatherEmoji,
  examples
};
