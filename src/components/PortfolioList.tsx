import React from 'react';
import './portfolio-list.css';

interface ExperienceItem {
  role?: string;
  title?: string;
  name?: string;
  company?: string;
  dates?: string;
  location?: string;
  summary?: string;
}

interface PortfolioListProps {
  data: ExperienceItem[] | null;
}

// PortfolioList component - renders portfolio/experience data
export default function PortfolioList({ data }: PortfolioListProps) {
  if (!data || !Array.isArray(data)) {
    return (
      <div className="portfolio-list">
        <p>No portfolio data available.</p>
      </div>
    );
  }

  return (
    <div className="portfolio-list">
      <h2>Experience</h2>
      <dl>
        {data.map((item, index) => (
          <React.Fragment key={index}>
            <dt className="portfolio-item-term">
              {item.role || item.title || item.name || `Item ${index + 1}`}
            </dt>
            <dd className="portfolio-item-details">
              {item.company && <strong>{item.company}</strong>}
              {item.dates && <span className="portfolio-item-dates">— {item.dates}</span>}
              {item.location && <span className="portfolio-item-location">({item.location})</span>}
              {item.summary && (
                <p className="portfolio-item-summary">{item.summary}</p>
              )}
            </dd>
          </React.Fragment>
        ))}
      </dl>
    </div>
  );
}
