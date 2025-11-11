// src/utils/telemetry.ts

// Minimal telemetry stub — no-op unless configured via window.__TELEMETRY_ENDPOINT__

export function sendTelemetry(event: string, payload: Record<string, any> = {}): void {
  try {
    const data = { event, payload, ts: new Date().toISOString() };

    console.warn('[TELEMETRY]', data);

    if (typeof window !== 'undefined' && (window as any).__TELEMETRY_ENDPOINT__) {
      try {
        navigator.sendBeacon((window as any).__TELEMETRY_ENDPOINT__, JSON.stringify(data));
      } catch (e) { /* ignore */ }
    }
  } catch (e) { /* ignore telemetry errors */ }
}

