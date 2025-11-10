const CACHE_NAME = "bearcave-marketing-v3";
const STATIC_CACHE = "bearcave-static-v3";
const DYNAMIC_CACHE = "bearcave-dynamic-v3";
const IMAGE_CACHE = "bearcave-images-v3";
const MANIFEST_URL = "/manifest.json";
const APP_SHELL = ["/", "/index.html"];

// Cache duration settings
const CACHE_DURATION = {
  STATIC: 31536000, // 1 year
  DYNAMIC: 86400,   // 1 day
  IMAGES: 2592000,  // 30 days
};

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

    const contentType = response.headers.get("content-type");
    // Check if response is actually JSON, not HTML (404 page)
    if (!contentType || !contentType.includes("application/json")) {
      const text = await response.text();
      // If we got HTML (like a 404 page), don't try to parse as JSON
      if (text.trim().startsWith("<!") || text.trim().startsWith("<html")) {
        console.warn("⚠️ Service Worker: Manifest returned HTML instead of JSON, manifest may not exist");
        return APP_SHELL;
      }
      // Try to parse as JSON anyway if it's not HTML
      try {
        const manifest = JSON.parse(text);
        return processManifest(manifest);
      } catch (parseError) {
        console.warn("⚠️ Service Worker: Manifest is not valid JSON, using fallback");
        return APP_SHELL;
      }
    }

    const manifest = await response.json();
    return processManifest(manifest);
  } catch (error) {
    // Silently handle manifest loading errors - it's optional
    if (error.message && (error.message.includes("Unexpected token") || error.message.includes("JSON"))) {
      console.warn("⚠️ Service Worker: Manifest file not found or invalid, using fallback");
    } else {
      console.warn("⚠️ Service Worker: Unable to load manifest, using fallback:", error.message);
    }
    return APP_SHELL;
  }
}

function processManifest(manifest) {
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
          if (cacheName !== STATIC_CACHE &&
              cacheName !== DYNAMIC_CACHE &&
              cacheName !== IMAGE_CACHE &&
              !cacheName.startsWith('jacob-')) {
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

  // Handle cache update requests
  if (event.data && event.data.type === "CACHE_UPDATE") {
    precacheCriticalAssets();
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

  // Strategy 1: Cache First for static assets (JS, CSS)
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

  // Strategy 4: Cache First for images (with network fallback)
  if (isImage(url)) {
    return imageCacheStrategy(request, IMAGE_CACHE);
  }

  // Default: Network First with cache fallback
  return networkWithCacheFallback(request, DYNAMIC_CACHE);
}

// Cache First Strategy
async function cacheFirst(request, cacheName) {
  const cached = await caches.match(request);
  if (cached) {
    return cached;
  }

  try {
    const response = await fetch(request);
    if (response.ok) {
      // Clone response before caching since response body can only be read once
      const responseClone = response.clone();
      const cache = await caches.open(cacheName);
      cache.put(request, responseClone);
    }
    return response;
  } catch (error) {
    // Return offline fallback if available
    const offlinePage = await caches.match('/offline.html');
    if (offlinePage) return offlinePage;
    return new Response("Offline", { status: 503 });
  }
}

// Network First Strategy
async function networkFirst(request, cacheName) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      // Clone response before caching since response body can only be read once
      const responseClone = response.clone();
      const cache = await caches.open(cacheName);
      cache.put(request, responseClone);
    }
    return response;
  } catch (error) {
    const cached = await caches.match(request);
    return cached || new Response("Offline", { status: 503 });
  }
}

// Stale While Revalidate Strategy
async function staleWhileRevalidate(request, cacheName) {
  const cached = await caches.match(request);

  const fetchPromise = fetch(request).then(response => {
    if (response.ok && response.status === 200) {
      // Clone response BEFORE returning it, since response body can only be read once
      const responseClone = response.clone();
      // Cache the clone asynchronously
      caches.open(cacheName).then(cache => {
        cache.put(request, responseClone).catch(() => {
          // Silently fail if caching fails
        });
      });
    }
    return response;
  }).catch(() => {
    // If network fails, return cached version
    return cached;
  });

  return cached || fetchPromise;
}

// Image Cache Strategy - Cache first with long expiration
async function imageCacheStrategy(request, cacheName) {
  const cached = await caches.match(request);
  if (cached) {
    return cached;
  }

  try {
    const response = await fetch(request);
    if (response.ok) {
      // Clone response before caching since response body can only be read once
      const responseClone = response.clone();
      const cache = await caches.open(cacheName);
      cache.put(request, responseClone);
    }
    return response;
  } catch (error) {
    // Return placeholder image if available
    const placeholder = await caches.match('/images/placeholder.jpg');
    return placeholder || new Response("Image unavailable", { status: 503 });
  }
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
         url.pathname.endsWith(".js") ||
         url.pathname.includes("/fonts/");
}

function isApiCall(url) {
  return url.pathname.startsWith("/api/");
}

function isHtmlPage(url) {
  return url.pathname.endsWith(".html") ||
         url.pathname === "/" ||
         (!url.pathname.includes(".") && !url.pathname.startsWith("/api"));
}

function isImage(url) {
  return /\.(jpg|jpeg|png|gif|webp|avif|svg|ico)$/i.test(url.pathname) ||
         url.pathname.includes("/images/");
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
  // Implementation would store form data in IndexedDB and retry on sync
}

// Push notifications (optional - for future use)
self.addEventListener("push", event => {
  if (event.data) {
    const data = event.data.json();
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: "/favicon-32x32.png",
      badge: "/favicon-16x16.png",
    });
  }
});
