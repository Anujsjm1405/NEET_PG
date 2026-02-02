const CACHE_NAME = "neet-tracker-v1";

const urlsToCache = [
  "./",
  "./dashboard.html",
  "./GT.html",
  "./subject.html",
  "./time.html",
  "./chart.umd.min.js",
  "./manifest.json"
];

// Install
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Activate
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(names =>
      Promise.all(
        names.filter(n => n !== CACHE_NAME)
             .map(n => caches.delete(n))
      )
    )
  );
});

// Fetch
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
