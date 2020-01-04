const NAME = "form-validation";
const VERSION = "0.0.8";
const SW = `${NAME}-${VERSION}`;

const assets = ["/", "/index.html", "/main.css", "/main.js"];

self.addEventListener("install", event => {
  console.log("installing service worker");
  event.waitUntil(
    (async () => {
      try {
        const cache = await caches.open(SW);
        return Promise.all(assets.map(asset => cache.add(asset)));
      } catch (error) {
        console.error(error);
      }
    })()
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    (async () => {
      try {
        const keys = await caches.keys();
        return Promise.all(
          keys.filter(key => !key.includes(SW)).map(key => caches.delete(key))
        );
      } catch (error) {
        console.error(error);
      }
    })()
  );
});

self.addEventListener("fetch", event => {
  console.log("fetching...", event);
  const { url, method } = event.request;
  if (method !== "GET") return;

  event.respondWith(
    (async () => {
      try {
        const cache = await caches.open(SW);
        const cacheResponse = await cache.match(url);
        console.log("cacheResponse", cacheResponse, url);

        if (cacheResponse) {
          console.log("returning from cache...", url);
          return cacheResponse;
        } else {
          // return event.waitUntil((async () => {
          console.log("fetching, then caching...", url);
          const fetchResponse = await fetch(url);
          console.log("fetchResponse", fetchResponse, url);
          cache.put(url, fetchResponse.clone());
          return fetchResponse;
          // })());
        }
      } catch (error) {
        console.error(error);
      }
    })()
  );
});
