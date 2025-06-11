// service-worker.js

// nama cache nya
const CACHE_NAME = 'heba-site-v1';

// daftar file yang di simpan biar bisa di akses offline
const urlsToCache = [
  '/',
  '/index.html',
  '/Contact.html',
  '/About.html', 
  '/public/assets/project1.jpg',
  '/public/assets/GitHub-Mark.jpg',
  '/public/assets/Instagram_icon.jpg',
  '/public/assets/LinkedIn-Logo.wine.jpg',
  
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
