var CacheName = 'petstore-v1';
var CacheFiles = [
    'index.html',
    'products.js',
    'petstore.webmanifest',
    'images/img12.jpg',
    'images/img13.png'
];

self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install');
    e.waituntil(
        caches.open(CacheName).then((cache) => {
            console.log('[Service Worker] Caching all the Files');
            return cache.addAll(CacheFiles);
        })
    );
});

self.addEventListener('fetch', function (e) {
    e.respondWith(
        caches.match(e.request).then(function (r) {
            //Download the file if is not in the cache,
            return r || fetch(e.request).then(function (response){
                //add the new file to cache
                return caches.open(CacheName).then(function (cache) {
                    cache.put(e.request, response.clone());
                    return response;
                });
            });
        })
    );
});