import React from 'react';

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
          <div key={index} style={{ marginBottom: '1.5rem' }}>
            <dt style={{ fontWeight: 'bold', fontSize: '1.1em' }}>
              {item.role || item.title || item.name || `Item ${index + 1}`}
            </dt>
            <dd style={{ marginLeft: '1rem', marginTop: '0.5rem' }}>
              {item.company && <strong>{item.company}</strong>}
              {item.dates && <span style={{ marginLeft: '0.5rem' }}>— {item.dates}</span>}
              {item.location && <span style={{ marginLeft: '0.5rem' }}>({item.location})</span>}
              {item.summary && (
                <p style={{ marginTop: '0.5rem', marginBottom: 0 }}>{item.summary}</p>
              )}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
