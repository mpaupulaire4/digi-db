import { build, files, timestamp } from '$service-worker';

const STATIC_CACHE_VERSION = 0;
const CURRENT_CACHES = [
  `build-${timestamp}`,
  `static-${STATIC_CACHE_VERSION}`,
]


self.addEventListener('install', (event: any) => {
  // Perform install steps
  event.waitUntil(
    Promise.all([
      caches.open(CURRENT_CACHES[0])
        .then((cache) => {
          console.log(`Opened cache: ${CURRENT_CACHES[0]}`);
          return cache.addAll(build);
        }),
      caches.open(CURRENT_CACHES[1])
        .then((cache) => {
          console.log(`Opened cache: ${CURRENT_CACHES[1]}`);
          return cache.addAll(files);
        }),
    ])
  );
});


self.addEventListener('activate', (event: any) => {
  // Delete all caches that aren't named in CURRENT_CACHES.
  // While there is only one cache in this example, the same logic will handle the case where
  // there are multiple versioned caches.
  const expectedCacheNamesSet = new Set(CURRENT_CACHES);
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!expectedCacheNamesSet.has(cacheName)) {
            // If this cache name isn't present in the set of "expected" cache names, then delete it.
            console.log('Deleting out of date cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event: any) => {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
