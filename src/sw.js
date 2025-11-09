const CACHE_NAME = "jacob-portfolio-v2";
const STATIC_CACHE = "jacob-static-v2";
const DYNAMIC_CACHE = "jacob-dynamic-v2";
const MANIFEST_URL = "/manifest.json";
const APP_SHELL = ["/", "/index.html"];

// Helper to normalise asset paths coming from the Vite manifest
const withLeadingSlash = value => (value.startsWith("/") ? value : `/${value}`);

async function precacheCriticalAssets() {
  const cache = await caches.open(STATIC_CACHE);
  const assets = await getManifestAssets();

  await Promise.all(
    assets.map(async asset => {
      try {
        await cache.add(asset);
      } catch (error) {
        console.warn("⚠️ Service Worker: Failed to precache", asset, error);
      }
    })
  );
}

async function getManifestAssets() {
  try {
    const response = await fetch(MANIFEST_URL, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Failed to load manifest: ${response.status}`);
    }

    const manifest = await response.json();
    const assets = new Set(APP_SHELL);

    Object.values(manifest).forEach(entry => {
      if (!entry || typeof entry !== "object") return;

      if (entry.file) assets.add(withLeadingSlash(entry.file));

      if (Array.isArray(entry.css)) {
        entry.css.forEach(file => assets.add(withLeadingSlash(file)));
      }

      if (Array.isArray(entry.assets)) {
        entry.assets.forEach(file => assets.add(withLeadingSlash(file)));
      }
    });

    return Array.from(assets);
  } catch (error) {
    console.error("❌ Service Worker: Unable to load manifest", error);
    return APP_SHELL;
  }
}

// Install event - cache critical resources
self.addEventListener("install", event => {
  console.log("🔧 Service Worker: Installing...");
  event.waitUntil(
    (async () => {
      try {
        console.log("📦 Service Worker: Pre-caching critical resources");
        await precacheCriticalAssets();
        console.log("✅ Service Worker: Critical resources cached");
      } catch (error) {
        console.error("❌ Service Worker: Pre-cache failed", error);
      } finally {
        await self.skipWaiting();
      }
    })()
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", e => {
  console.log("🚀 Service Worker: Activating...");
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
            console.log("🗑️ Service Worker: Deleting old cache:", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log("✅ Service Worker: Activated and ready");
      return self.clients.claim();
    })
  );
});

self.addEventListener("message", event => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    console.log("📨 Service Worker: Received SKIP_WAITING message");
    self.skipWaiting();
  }
});

// Fetch event - implement caching strategies
self.addEventListener("fetch", e => {
  const { request } = e;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== "GET") return;

  // Skip chrome-extension and other non-http requests
  if (!url.protocol.startsWith("http")) return;

  e.respondWith(handleRequest(request));
});

async function handleRequest(request) {
  const url = new URL(request.url);

  // Strategy 1: Cache First for static assets
  if (isStaticAsset(url)) {
    return cacheFirst(request, STATIC_CACHE);
  }

  // Strategy 2: Network First for API calls
  if (isApiCall(url)) {
    return networkFirst(request, DYNAMIC_CACHE);
  }

  // Strategy 3: Stale While Revalidate for HTML pages
  if (isHtmlPage(url)) {
    return staleWhileRevalidate(request, DYNAMIC_CACHE);
  }

  // Strategy 4: Network First for images
  if (isImage(url)) {
    return networkFirst(request, DYNAMIC_CACHE);
  }

  // Default: Network with cache fallback
  return networkWithCacheFallback(request, DYNAMIC_CACHE);
}

// Cache First Strategy
async function cacheFirst(request, cacheName) {
  const cached = await caches.match(request);
  if (cached) {
    console.log("📦 Cache hit:", request.url);
    return cached;
  }

  const response = await fetch(request);
  if (response.ok) {
    const cache = await caches.open(cacheName);
    cache.put(request, response.clone());
  }
  return response;
}

// Network First Strategy
async function networkFirst(request, cacheName) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    console.log("🌐 Network failed, trying cache:", request.url);
    const cached = await caches.match(request);
    return cached || new Response("Offline", { status: 503 });
  }
}

// Stale While Revalidate Strategy
async function staleWhileRevalidate(request, cacheName) {
  const cached = await caches.match(request);

  const fetchPromise = fetch(request).then(response => {
    if (response.ok) {
      const cache = caches.open(cacheName);
      cache.then(c => c.put(request, response.clone()));
    }
    return response;
  });

  return cached || fetchPromise;
}

// Network with Cache Fallback
async function networkWithCacheFallback(request, cacheName) {
  try {
    return await fetch(request);
  } catch (error) {
    return await caches.match(request) || new Response("Offline", { status: 503 });
  }
}

// Helper functions to determine request type
function isStaticAsset(url) {
  return url.pathname.includes("/assets/") ||
         url.pathname.endsWith(".css") ||
         url.pathname.endsWith(".js");
}

function isApiCall(url) {
  return url.pathname.startsWith("/api/");
}

function isHtmlPage(url) {
  return url.pathname.endsWith(".html") ||
         url.pathname === "/" ||
         !url.pathname.includes(".");
}

function isImage(url) {
  return /\.(jpg|jpeg|png|gif|webp|avif|svg)$/i.test(url.pathname);
}

// Background sync for form submissions
self.addEventListener("sync", e => {
  if (e.tag === "contact-form") {
    e.waitUntil(syncContactForm());
  }
});

async function syncContactForm() {
  // Handle offline form submissions
  console.log("📝 Service Worker: Syncing contact form");
}
