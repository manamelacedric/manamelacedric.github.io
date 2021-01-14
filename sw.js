const cacheName = "_cedm_";
const assets = [
  "/",
  "/index.html",
  "/404.html",
  "/js/index.js",
  "/css/styles.css",
  "/manifest.json",
]

// Cache all the files
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(assets);
    })
    // .then((data) => console.log('data', data))
    // .catch(err => console.log('err', err))
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
