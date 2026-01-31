// CHANGE THIS: v1 -> v4
const CACHE_NAME = 'med-leave-v4'; 

const ASSETS = [
    './',
    './index.html',
    './style.css',
    './script.js',
    './manifest.json'
];

// Install event: Delete old caches that don't match the new version
self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            );
        }).then(() => {
            return caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS));
        })
    );
    // Force the waiting service worker to become the active service worker
    self.skipWaiting(); 
});

self.addEventListener('activate', (e) => {
    // Claim clients immediately so the user sees updates without reopening twice
    e.waitUntil(clients.claim());
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => response || fetch(e.request))
    );
});
