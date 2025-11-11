// src/utils/fetchWithRetry.js

// small fetch helper with retries and exponential backoff

export default async function fetchWithRetry(url, opts = {}, retries = 2, backoff = 200) {

  let attempt = 0;

  while (true) {

    try {

      const res = await fetch(url, opts);

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      return await res.json();

    } catch (err) {

      attempt++;

      if (attempt > retries) {

        throw err;

      }

      await new Promise(r => setTimeout(r, backoff * Math.pow(2, attempt - 1)));

    }

  }

}

