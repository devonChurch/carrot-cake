const cacheName = 'cache-v2';
const precacheResources = [
  '/',
  'index.html',
  'styles/main.css',
  'images/space1.jpg',
  'images/space2.jpg',
  'images/space3.jpg'
];

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
      try {
        const cache = await caches.open(cacheName);
        return Promise.all(precacheResources.map(asset => cache.add(asset)));
      } catch (error) {
        console.error(error);
      }
  })());
});

self.addEventListener('fetch', event => {
  event.respondWith((async () => {
    try {
      const cache = await caches.open(cacheName);
      const cacheResponse = await cache.match(event.request.url);
      if (cacheResponse) {
        return cacheResponse;
      } else {
        const serverResponse = await fetch(event.request.url);
        if (!serverResponse.ok) {
          throw new Error(serverResponse.statusText);
        }
        cache.add(serverResponse.clone());
        return serverResponse;
      }
    } catch (error) {
      console.error(error);
    }

  })())
})
