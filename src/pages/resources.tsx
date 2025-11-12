import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from '../components/animations/AnimatedSection';
import { fadeInUp, staggerContainer, staggerItem } from '../utils/animations';
import './resources.css';

interface API {
  id: string;
  name: string;
  description: string;
  category: string;
  endpoint: string;
  auth: string;
  useCases: string[];
  documentation: string;
  icon: string;
}

const selectedAPIs: API[] = [
  {
    id: 'open-meteo',
    name: 'Open-Meteo Weather',
    description: 'Free weather forecast API with 70+ years of historical data. No API key required, perfect for real-time weather displays.',
    category: 'Weather & Environment',
    endpoint: 'https://api.open-meteo.com/v1/forecast',
    auth: 'None',
    useCases: [
      'Real-time weather cards for user location',
      'Historical weather analysis',
      'Weather-based UX personalization',
      'Event planning tools'
    ],
    documentation: 'https://open-meteo.com/en/docs',
    icon: '🌦️'
  },
  {
    id: 'frankfurter',
    name: 'Frankfurter Currency',
    description: 'Real-time and historical currency exchange rates. Free, open-source, no authentication required.',
    category: 'Finance & Currency',
    endpoint: 'https://api.frankfurter.app/latest',
    auth: 'None',
    useCases: [
      'Currency converter widgets',
      'International pricing displays',
      'Financial dashboards',
      'Travel planning tools'
    ],
    documentation: 'https://www.frankfurter.app/docs/',
    icon: '💱'
  },
  {
    id: 'useless-facts',
    name: 'Random Fun Facts',
    description: 'Get random, interesting facts to add personality and engagement to your site. Great for loading states or sidebar widgets.',
    category: 'Content & Engagement',
    endpoint: 'https://uselessfacts.jsph.pl/random.json',
    auth: 'None',
    useCases: [
      'Loading screen entertainment',
      'Daily fact widgets',
      'Engagement boosters',
      'Educational content'
    ],
    documentation: 'https://uselessfacts.jsph.pl/',
    icon: '💡'
  },
  {
    id: 'ipapi',
    name: 'IP Geolocation',
    description: 'Detect visitor location from IP address. Enables personalized content, localized UX, and regional targeting.',
    category: 'Analytics & UX',
    endpoint: 'https://ipapi.co/json/',
    auth: 'None (optional API key)',
    useCases: [
      'Personalized content delivery',
      'Regional analytics',
      'Localized UX elements',
      'Security and fraud detection'
    ],
    documentation: 'https://ipapi.co/api/',
    icon: '🌍'
  },
  {
    id: 'qr-code',
    name: 'QR Code Generator',
    description: 'Generate QR codes on the fly for any URL or text. Essential for modern marketing and easy content sharing.',
    category: 'Developer Tools',
    endpoint: 'https://api.qrserver.com/v1/create-qr-code/',
    auth: 'None',
    useCases: [
      'Quick sharing features',
      'Print-to-digital bridges',
      'Event check-in systems',
      'Marketing materials'
    ],
    documentation: 'https://goqr.me/api/',
    icon: '📱'
  }
];

const resources: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  const categories = ['All', ...Array.from(new Set(selectedAPIs.map(api => api.category)))];
  
  const filteredAPIs = selectedCategory === 'All' 
    ? selectedAPIs 
    : selectedAPIs.filter(api => api.category === selectedCategory);

  return (
    <div className="resources-page">
      <AnimatedSection className="resources-hero">
        <motion.div
          className="hero-content"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
        >
          <h1 className="hero-title">API Resources</h1>
          <p className="hero-subtitle">
            Curated collection of powerful, free APIs to enhance your projects. 
            Each API selected for accessibility, developer experience, and real-world impact.
          </p>
        </motion.div>
      </AnimatedSection>

      <div className="resources-container">
        <motion.div 
          className="category-filter"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
        >
          {categories.map(category => (
            <button
              key={category}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </motion.div>

        <motion.div
          className="api-grid"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {filteredAPIs.map((api, index) => (
            <motion.div
              key={api.id}
              className="api-card"
              variants={staggerItem}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
            >
              <div className="api-header">
                <span className="api-icon" role="img" aria-label={api.name}>
                  {api.icon}
                </span>
                <div>
                  <h3 className="api-name">{api.name}</h3>
                  <span className="api-category">{api.category}</span>
                </div>
              </div>
              
              <p className="api-description">{api.description}</p>
              
              <div className="api-details">
                <div className="api-detail-item">
                  <strong>Endpoint:</strong>
                  <code className="api-endpoint">{api.endpoint}</code>
                </div>
                <div className="api-detail-item">
                  <strong>Authentication:</strong>
                  <span className="api-auth">{api.auth}</span>
                </div>
              </div>

              <div className="api-use-cases">
                <strong>Use Cases:</strong>
                <ul>
                  {api.useCases.slice(0, 3).map((useCase, idx) => (
                    <li key={idx}>{useCase}</li>
                  ))}
                </ul>
              </div>

              <div className="api-actions">
                <a 
                  href={api.documentation}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="api-docs-btn"
                >
                  View Documentation →
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="resources-footer"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
        >
          <div className="footer-content">
            <h2>Why These APIs?</h2>
            <div className="rationale-grid">
              <div className="rationale-card">
                <h3>🎯 Accessibility First</h3>
                <p>No authentication barriers, free tier sufficient for most use cases, easy integration</p>
              </div>
              <div className="rationale-card">
                <h3>✨ UX Enhancement</h3>
                <p>Real-time data, personalized content, engaging interactions that delight users</p>
              </div>
              <div className="rationale-card">
                <h3>🚀 Developer Friendly</h3>
                <p>RESTful design, clear documentation, simple endpoints, instant results</p>
              </div>
              <div className="rationale-card">
                <h3>💎 Marketing Value</h3>
                <p>Dynamic content, shareability, data visualization, competitive differentiation</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default resources;
