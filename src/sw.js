const CACHE_NAME = "jacob-portfolio-v2";
const STATIC_CACHE = "jacob-static-v2";
const DYNAMIC_CACHE = "jacob-dynamic-v2";

// Critical resources to cache immediately
const CRITICAL_RESOURCES = [
  "/",
  "/index.html",
  "/assets/index-D_B07x9e.css",
  "/assets/index-1JZRqu4T.js",
  "/assets/react-vendor-BTY1zH9O.js"
];

// Install event - cache critical resources
self.addEventListener("install", e => {
  console.log("🔧 Service Worker: Installing...");
  e.waitUntil(
    caches.open(STATIC_CACHE).then(cache => {
      console.log("📦 Service Worker: Caching critical resources");
      return cache.addAll(CRITICAL_RESOURCES);
    }).then(() => {
      console.log("✅ Service Worker: Critical resources cached");
      return self.skipWaiting();
    })
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
