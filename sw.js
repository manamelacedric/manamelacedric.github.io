const cacheName = "_cedm_";

// Cache all the files
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll([
        "./",
        "./index.js",
        "./manifest.js",
        "./css/styles.css",
        "./js/index.js",
      ]);
    })
  );
});

// Intercept fetch calls and serve cached assets if necessary
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches
      .open(cacheName)
      .then((cache) => {
        return cache.match(e.request, { ignoreSearch: true });
      })
      .then((res) => {
        return res || fetch(e.request);
      })
  );
});
