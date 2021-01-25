const cacheName = "_cedm_";
const assets = [
  "/",
  "/index.html",
  "/js/index.js",
  "/css/styles.css",
  "/manifest.json",
];

// checks if the device has internet connection
async function onLine() {
  try {
    const res = fetch("/online");
    return res.status >= 200 && res.status < 300;
  } catch (e) {
    return false;
  }
}

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
  console.log("e.request", e.request);
  e.respondWith(
    caches
      .open(cacheName)
      .then((cache) => {
        return null;
        // return cache.match(e.request, { ignoreSearch: true });
      })
      .then((res) => {
        return res || fetch(e.request);
      })
  );
});
