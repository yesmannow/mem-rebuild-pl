import React, { useEffect, useState } from 'react';
import fetchWithRetry from '../utils/fetchWithRetry';
import { sendTelemetry } from '../utils/telemetry';
import ResumeSkeleton from '../components/ResumeSkeleton';
import PortfolioList from '../components/PortfolioList';

export default function ResumePage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchWithRetry('/api/portfolio', {}, 2, 200)
      .then(d => {
        if (!mounted) return;
        setData(d);
        setLoading(false);
      })
      .catch(err => {
        if (!mounted) return;
        setError(err);
        setLoading(false);
        console.warn('[RESUME] portfolio fetch failed', err);
        sendTelemetry('resume-fetch-failed', { message: String(err) });
      });
    return () => { mounted = false; };
  }, []);

  if (loading && !data) {
    return (
      <main aria-busy="true" aria-live="polite" className="resume-page">
        <header>
          <h1>Jacob Darling</h1>
          <p>Fractional CMO & Marketing Technologist</p>
        </header>
        <ResumeSkeleton />
      </main>
    );
  }

  if (error && !data) {
    return (
      <main role="main" className="resume-page">
        <header>
          <h1>Jacob Darling</h1>
          <p>Fractional CMO & Marketing Technologist</p>
        </header>
        <div role="alert" className="resume-error">
          Could not load portfolio data right now. Contact: <a href="mailto:jacob@jacobdarling.com">jacob@jacobdarling.com</a>
        </div>
      </main>
    );
  }

  return (
    <main className="resume-page">
      <header>
        <h1>Jacob Darling</h1>
        <p>Fractional CMO & Marketing Technologist</p>
      </header>
      <PortfolioList data={data} />
    </main>
  );
}
