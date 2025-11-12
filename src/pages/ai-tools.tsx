import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from '../components/animations/AnimatedSection';
import { fadeInUp, staggerContainer, staggerItem } from '../utils/animations';
import './ai-tools.css';

interface WeatherData {
  temperature: number;
  conditions: string;
  location: string;
}

interface CurrencyRates {
  [key: string]: number;
}

const AITools: React.FC = () => {
  // Weather widget state
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [weatherLoading, setWeatherLoading] = useState(false);

  // Currency converter state
  const [amount, setAmount] = useState<string>('100');
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('EUR');
  const [rates, setRates] = useState<CurrencyRates | null>(null);
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);

  // Fun fact state
  const [funFact, setFunFact] = useState<string>('');
  const [factLoading, setFactLoading] = useState(false);

  // QR Code state
  const [qrText, setQrText] = useState<string>('https://yesmannow.github.io/mem-rebuild-pl/');

  // Fetch weather data
  const fetchWeather = async () => {
    setWeatherLoading(true);
    try {
      // Get user location (default to San Francisco coordinates)
      const latitude = 37.7749;
      const longitude = -122.4194;
      
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      );
      const data = await response.json();
      
      setWeather({
        temperature: data.current_weather.temperature,
        conditions: getWeatherDescription(data.current_weather.weathercode),
        location: 'San Francisco, CA'
      });
    } catch (error) {
      console.error('Error fetching weather:', error);
    } finally {
      setWeatherLoading(false);
    }
  };

  // Get weather description from code
  const getWeatherDescription = (code: number): string => {
    const descriptions: { [key: number]: string } = {
      0: 'Clear sky',
      1: 'Mainly clear',
      2: 'Partly cloudy',
      3: 'Overcast',
      45: 'Foggy',
      48: 'Rime fog',
      51: 'Light drizzle',
      61: 'Light rain',
      80: 'Rain showers'
    };
    return descriptions[code] || 'Unknown';
  };

  // Fetch currency rates
  const fetchRates = async () => {
    try {
      const response = await fetch('https://api.frankfurter.app/latest');
      const data = await response.json();
      setRates(data.rates);
    } catch (error) {
      console.error('Error fetching rates:', error);
    }
  };

  // Convert currency
  useEffect(() => {
    if (rates && amount) {
      const numAmount = parseFloat(amount);
      if (!isNaN(numAmount)) {
        const fromRate = fromCurrency === 'EUR' ? 1 : rates[fromCurrency] || 1;
        const toRate = toCurrency === 'EUR' ? 1 : rates[toCurrency] || 1;
        const result = (numAmount / fromRate) * toRate;
        setConvertedAmount(result);
      }
    }
  }, [amount, fromCurrency, toCurrency, rates]);

  // Fetch fun fact
  const fetchFunFact = async () => {
    setFactLoading(true);
    try {
      const response = await fetch('https://uselessfacts.jsph.pl/random.json?language=en');
      const data = await response.json();
      setFunFact(data.text);
    } catch (error) {
      console.error('Error fetching fun fact:', error);
      setFunFact('Did you know? The first computer bug was an actual bug - a moth trapped in a Harvard Mark II computer in 1947!');
    } finally {
      setFactLoading(false);
    }
  };

  // Load initial data
  useEffect(() => {
    fetchWeather();
    fetchRates();
    fetchFunFact();
  }, []);

  const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'INR'];

  return (
    <div className="ai-tools-page">
      <AnimatedSection className="tools-hero">
        <motion.div
          className="hero-content"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
        >
          <h1 className="hero-title">Live API Integrations</h1>
          <p className="hero-subtitle">
            Real-time demonstrations of API integrations. Each widget showcases practical implementations you can use in your projects.
          </p>
        </motion.div>
      </AnimatedSection>

      <div className="tools-container">
        <motion.div
          className="widgets-grid"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Weather Widget */}
          <motion.div className="widget-card" variants={staggerItem}>
            <div className="widget-header">
              <h3>🌦️ Weather Widget</h3>
              <button onClick={fetchWeather} className="refresh-btn" disabled={weatherLoading}>
                {weatherLoading ? '↻ Loading...' : '↻ Refresh'}
              </button>
            </div>
            <div className="widget-content">
              {weather ? (
                <div className="weather-display">
                  <div className="weather-temp">{weather.temperature}°C</div>
                  <div className="weather-conditions">{weather.conditions}</div>
                  <div className="weather-location">{weather.location}</div>
                </div>
              ) : (
                <div className="loading-state">Loading weather data...</div>
              )}
            </div>
            <div className="widget-footer">
              <span className="widget-api">API: Open-Meteo</span>
            </div>
          </motion.div>

          {/* Currency Converter Widget */}
          <motion.div className="widget-card" variants={staggerItem}>
            <div className="widget-header">
              <h3>💱 Currency Converter</h3>
            </div>
            <div className="widget-content">
              <div className="converter-form">
                <div className="converter-row">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="amount-input"
                    placeholder="Amount"
                  />
                  <select
                    value={fromCurrency}
                    onChange={(e) => setFromCurrency(e.target.value)}
                    className="currency-select"
                  >
                    {currencies.map(curr => (
                      <option key={curr} value={curr}>{curr}</option>
                    ))}
                  </select>
                </div>
                <div className="converter-arrow">↓</div>
                <div className="converter-row">
                  <div className="converted-display">
                    {convertedAmount !== null ? convertedAmount.toFixed(2) : '0.00'}
                  </div>
                  <select
                    value={toCurrency}
                    onChange={(e) => setToCurrency(e.target.value)}
                    className="currency-select"
                  >
                    {currencies.map(curr => (
                      <option key={curr} value={curr}>{curr}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="widget-footer">
              <span className="widget-api">API: Frankfurter</span>
            </div>
          </motion.div>

          {/* Fun Fact Widget */}
          <motion.div className="widget-card" variants={staggerItem}>
            <div className="widget-header">
              <h3>💡 Random Fun Fact</h3>
              <button onClick={fetchFunFact} className="refresh-btn" disabled={factLoading}>
                {factLoading ? '↻ Loading...' : '↻ New Fact'}
              </button>
            </div>
            <div className="widget-content">
              <div className="fact-display">
                {funFact || 'Loading interesting fact...'}
              </div>
            </div>
            <div className="widget-footer">
              <span className="widget-api">API: Random Useless Facts</span>
            </div>
          </motion.div>

          {/* QR Code Generator Widget */}
          <motion.div className="widget-card" variants={staggerItem}>
            <div className="widget-header">
              <h3>📱 QR Code Generator</h3>
            </div>
            <div className="widget-content">
              <input
                type="text"
                value={qrText}
                onChange={(e) => setQrText(e.target.value)}
                className="qr-input"
                placeholder="Enter URL or text"
              />
              <div className="qr-display">
                {qrText && (
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrText)}`}
                    alt="QR Code"
                    className="qr-image"
                  />
                )}
              </div>
            </div>
            <div className="widget-footer">
              <span className="widget-api">API: QR Code API</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="integration-info"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
        >
          <h2>Integration Benefits</h2>
          <div className="benefits-grid">
            <div className="benefit-card">
              <h3>🚀 No Authentication</h3>
              <p>All these APIs work without API keys, making integration instant and hassle-free.</p>
            </div>
            <div className="benefit-card">
              <h3>⚡ Real-Time Data</h3>
              <p>Live data updates provide engaging, dynamic user experiences.</p>
            </div>
            <div className="benefit-card">
              <h3>🎯 Production Ready</h3>
              <p>Reliable, well-documented APIs suitable for production use.</p>
            </div>
            <div className="benefit-card">
              <h3>💎 Free Forever</h3>
              <p>No cost barriers - perfect for startups and side projects.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AITools;
