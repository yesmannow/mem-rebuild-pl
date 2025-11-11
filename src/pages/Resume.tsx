import React, { useEffect, useState } from 'react';
import fetchWithRetry from '../utils/fetchWithRetry';
import { sendTelemetry } from '../utils/telemetry';
import ResumeSkeleton from '../components/ResumeSkeleton';
import PortfolioList from '../components/PortfolioList';
import resumeData from '../data/resume.json';

interface ExperienceItem {
  role?: string;
  title?: string;
  name?: string;
  company?: string;
  dates?: string;
  location?: string;
  summary?: string;
}

export default function ResumePage() {
  const [data, setData] = useState<ExperienceItem[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchWithRetry('/api/portfolio', {}, 2, 200)
      .then((d: ExperienceItem[]) => {
        if (!mounted) return;
        setData(d);
        setLoading(false);
      })
      .catch((err: Error) => {
        if (!mounted) return;
        // Dev fallback: use local resume data when API fails
        if (import.meta.env.DEV) {
          console.warn('[RESUME] portfolio fetch failed, using local fallback', err);
          setData((resumeData as any).experience || []);
          setLoading(false);
        } else {
          setError(err);
          setLoading(false);
          console.warn('[RESUME] portfolio fetch failed', err);
          sendTelemetry('resume-fetch-failed', { message: String(err) });
        }
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
