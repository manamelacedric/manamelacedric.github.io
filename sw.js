const cacheName = '_cedm_'
const assets = [
	'/',
	'/index.html',
  '/favicon.ico',
  '/manifest.json',
	'/js/index.js',
	'/css/styles.css',
	'/assets/images/developer.svg',
]

// Cache all the files
self.addEventListener('install', (e) => {
	e.waitUntil(
		caches.open(cacheName).then((cache) => {
			return cache.addAll(assets)
		})
	)
})

// Intercept fetch calls and serve cached assets if necessary
self.addEventListener('fetch', (e) => {
	e.respondWith(
		fetch(e.request)
			.then((res) => {
				caches
					.open(cacheName)
					.then((cache) => cache.put(e.request, res.clone()))
				return res
			})
			.catch(() => caches.match(e.request))
	)
})
