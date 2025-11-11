import React from 'react';

// Minimal PortfolioList component for Phase A
// Accepts portfolio data and renders it
export default function PortfolioList({ data }) {
  if (!data || !Array.isArray(data)) {
    return (
      <div className="portfolio-list">
        <p>No portfolio data available.</p>
      </div>
    );
  }

  return (
    <div className="portfolio-list">
      <h2>Portfolio</h2>
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            {item.title || item.name || `Item ${index + 1}`}
          </li>
        ))}
      </ul>
    </div>
  );
}

