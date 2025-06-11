// service-worker.js

const CACHE_NAME = 'heba-site-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/Contact.html',
  '/About.html', // jika ada
  '/public/assets/project1.jpg',
  
  // Tailwind CSS lokal
  '/public/css/tailwind.min.css',
  '/public/css/tailwind-2.0.3.min.css',

  // Font Awesome CSS lokal
  '/public/fontawesome-free-6.7.2-web/css/all.min.css',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      )
    )
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) =>
      response || fetch(event.request)
    )
  );
});
