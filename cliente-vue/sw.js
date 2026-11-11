const CACHE_NAME = 'api-cache'

self.addEventListener('fetch', (event) => {
  if (event.request.url.includes('/api/')) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const resClone = response.clone()
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, resClone))
          return response
        })
        .catch(() => caches.match(event.request))
    )
  }
})