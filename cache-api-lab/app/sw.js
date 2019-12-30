const VERSION = 'v0.8';

const filesToCache = [
  '/',
  'style/main.css',
  'images/still_life_medium.jpg',
  'index.html',
  'pages/offline.html',
  'pages/404.html'
];

const staticCacheName = `pages-cache-${VERSION}`;

self.addEventListener('install', event => {
  console.log('installing...', VERSION);
  event.waitUntil(
    caches.open(staticCacheName)
      .then(cache => {
        return cache.addAll(filesToCache);
      })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    console.log(keys);
    return Promise.all(
      keys.map(key => {
        console.log(key);
        if (!key.includes(VERSION)) {
          console.log('deleting', key);
          return caches.delete(key)
        }
      })
    )
  })())
})

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          console.log('return from cache', event.request, VERSION);
          return response;
        } else {
          // debugger;
          console.log('fetching file from server', event.request, VERSION);
          return (
            fetch(event.request.url)
              .then(response => {
                console.log('assets response', response);

                if (response.status === 404) {
                  console.log('returning the 404 page');
                  return fetch('/pages/404.html');
                }
                else if (!response.ok) {
                  console.log('fetch was not ok');
                  throw new Error(response.statusText);
                }

                return caches.open(staticCacheName)
                  .then(cache => {
                    console.log('adding to cache', event.request, VERSION);
                    cache.put(event.request.url, response.clone())
                    return response;
                  })
              })
              .catch(async (error) => {
                // debugger;
                console.error(error);
                // console.log('returning the offline page');
                // return fetch('/pages/offline.html');

                try {
                    const response = await caches.match('/pages/offline.html');
                    console.log(response);
                    return response;

                } catch (error) {
                    console.error('fallback error!!!', error);
                }
              })
          );
        }
      })
      .catch(error => console.error(error))
  )
})
