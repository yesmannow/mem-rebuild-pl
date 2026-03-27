// Custom Elements guard must be first — prevents duplicate custom element definition errors
import './shims/ce-guard';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/globals.css';
import './styles/bearcave-brand.css';
import './styles/case-study-tokens.css';
import './styles/mobile-responsive.css';

// ---------------------------------------------------------------------------
// Service Worker
// ---------------------------------------------------------------------------

// In development: unregister any stale service workers to prevent caching bugs
if (import.meta.env.DEV && 'serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(registrations => {
    registrations.forEach(reg => reg.unregister());
  });
}

// In production: register the PWA service worker after page load
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js', { scope: '/' }).catch(err => {
      // eslint-disable-next-line no-console
      console.error('Service worker registration failed:', err);
    });
  });
}

// ---------------------------------------------------------------------------
// Mount timeout — shows a friendly message if the app stalls for > 10 s
// ---------------------------------------------------------------------------
const mountTimeout = setTimeout(() => {
  const rootEl = document.getElementById('root');
  if (!rootEl) return;
  const firstChild = rootEl.children[0];
  if (firstChild?.classList?.contains('initial-loader')) {
    // eslint-disable-next-line no-console
    console.error('React app failed to mount within 10 s');
    rootEl.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:center;min-height:100vh;background:#0f172a;color:#f8fafc;padding:2rem;font-family:sans-serif;">
        <div style="text-align:center;max-width:560px;">
          <h2 style="font-size:1.75rem;margin-bottom:1rem;color:#40E0D0;">Loading Timeout</h2>
          <p style="opacity:.9;margin-bottom:.5rem;">The app is taking longer than expected to load.</p>
          <p style="opacity:.65;font-size:.875rem;margin-bottom:1.5rem;">Open the browser console (F12) to check for errors.</p>
          <button onclick="location.reload()" style="padding:.75rem 2rem;background:#40E0D0;color:#0f172a;border:none;border-radius:8px;font-size:1rem;cursor:pointer;font-weight:600;">
            Reload Page
          </button>
        </div>
      </div>`;
  }
}, 10_000);

// ---------------------------------------------------------------------------
// React root mount
// ---------------------------------------------------------------------------
try {
  const rootEl = document.getElementById('root');
  if (!rootEl) throw new Error('Root element #root not found in the DOM.');

  const root = ReactDOM.createRoot(rootEl);

  // React Router v7 future flags — suppress migration warnings
  root.render(
    <React.StrictMode>
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );

  // Clear timeout and mark root as hydrated (suppresses Zero-FOUC flash)
  setTimeout(() => {
    clearTimeout(mountTimeout);
    rootEl.classList.add('loaded');
  }, 100);
} catch (error) {
  clearTimeout(mountTimeout);
  // eslint-disable-next-line no-console
  console.error('Failed to initialise React app:', error);

  const rootEl = document.getElementById('root');
  if (rootEl) {
    rootEl.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:center;min-height:100vh;background:#0f172a;color:#f8fafc;padding:2rem;font-family:sans-serif;">
        <div style="text-align:center;max-width:560px;">
          <h2 style="font-size:1.75rem;margin-bottom:1rem;color:#ef4444;">Application Error</h2>
          <p style="opacity:.9;margin-bottom:1rem;">Failed to load the portfolio application.</p>
          <pre style="opacity:.65;font-size:.8rem;background:rgba(255,255,255,.1);padding:1rem;border-radius:8px;word-break:break-all;text-align:left;">${error instanceof Error ? error.message : String(error)}</pre>
          <button onclick="location.reload()" style="margin-top:1.5rem;padding:.75rem 2rem;background:#40E0D0;color:#0f172a;border:none;border-radius:8px;font-size:1rem;cursor:pointer;font-weight:600;">
            Reload Page
          </button>
        </div>
      </div>`;
  }
}
