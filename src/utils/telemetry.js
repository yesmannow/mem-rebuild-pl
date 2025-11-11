// src/utils/telemetry.js

// Minimal telemetry stub — no-op unless configured via window.__TELEMETRY_ENDPOINT__

export function sendTelemetry(event, payload = {}) {

  try {

    const data = { event, payload, ts: new Date().toISOString() };

    console.warn('[TELEMETRY]', data);

    if (typeof window !== 'undefined' && window.__TELEMETRY_ENDPOINT__) {

      try {

        navigator.sendBeacon(window.__TELEMETRY_ENDPOINT__, JSON.stringify(data));

      } catch (e) { /* ignore */ }

    }

  } catch (e) { /* ignore telemetry errors */ }

}

