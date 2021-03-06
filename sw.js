this.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/style.css',
        '/app.js',
        '/manifest.json',
        '/shake.js'
        //'/star-wars-logo.jpg',
        //'/gallery/bountyHunters.jpg',
        //'/gallery/snowTroopers.jpg',
        //'/gallery/myLittleVader.jpg'
      ]);
    })
  );
});

this.addEventListener('fetch', function(event) {
  var response;
  event.respondWith(
    caches.match(event.request).catch(function() {
      return fetch(event.request);
    }).then(function(r) {
      response = r;
      caches.open('v1').then(function(cache) {
        cache.put(event.request, response);
      });
      return response.clone();
    }).catch(function() {
      return caches.match('/gallery/myLittleVader.jpg');
    })
  );
});
