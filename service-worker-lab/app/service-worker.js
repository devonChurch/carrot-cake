const version = 'v0.13';

self.addEventListener('install', event => {
  console.log('SW installing...', version);
  // Add a call to skipWaiting here
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  console.log('SW activating...', version);
});

self.addEventListener('fetch', event => {
  console.log('SW fetching...', version, event.request.url, event);
});
