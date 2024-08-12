var staticCacheName = "hello-pwa";
 
self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(staticCacheName).then(function (cache) {
      return cache.addAll(
["/offline.html",
"/assets/css/styles.css",
"/assets/css/buttons.css",
"/assets/css/gamecard.css",
"/assets/css/input.css",
"/assets/css/other.css",
"/assets/css/text.css",
"/assets/css/ultraviolet.css"
]
);
    })
  );
});

self.addEventListener("fetch", function (event) {
  console.log(event.request.url);
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    }).catch(function () {
                return caches.match('/offline.html');
            })
  );
});
