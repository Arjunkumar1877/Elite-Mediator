// const CACHE_NAME = "version-1";
// const urlsToCache = [ 'index.html', 'offline.html' ];

// const self = this;

// // Install SW
// self.addEventListener('install', (event) => {
//     event.waitUntil(
//         caches.open(CACHE_NAME)
//             .then((cache) => {
//                 console.log('Opened cache');

//                 return cache.addAll(urlsToCache);
//             })
//     )
// });

// // Listen for requests
// self.addEventListener('fetch', (event) => {
//     event.respondWith(
//         caches.match(event.request)
//             .then(() => {
//                 return fetch(event.request) 
//                     .catch(() => caches.match('offline.html'))
//             })
//     )
// });

// // Activate the SW
// self.addEventListener('activate', (event) => {
//     const cacheWhitelist = [];
//     cacheWhitelist.push(CACHE_NAME);

//     event.waitUntil(
//         caches.keys().then((cacheNames) => Promise.all(
//             cacheNames.map((cacheName) => {
//                 if(!cacheWhitelist.includes(cacheName)) {
//                     return caches.delete(cacheName);
//                 }
//             })
//         ))
            
//     )
// });


const CACHE_NAME = "version-1";
const urlsToCache = ['index.html', 'offline.html'];

const self = this;

// Install SW
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
            .then(() => self.skipWaiting()) // Ensure immediate activation
    );
});

// Listen for requests
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Cache hit - return response
                if (response) {
                    return response;
                }
                return fetch(event.request).catch(() => caches.match('offline.html'));
            })
    );
});

// Activate the SW
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];

    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim()) // Ensure the service worker takes control immediately
    );
});
