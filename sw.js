self.addEventListener("install", function(event) {
  console.log("[Service Worker] Installing Service Worker ...", event);
  /**
   * The install events in service workers use waitUntil() to hold the service
   * worker in the installing phase until tasks complete. If the promise passed
   * to waitUntil() rejects, the install is considered a failure, and the
   * installing service worker is discarded. This is primarily used to ensure
   * that a service worker is not considered installed until all of the core
   * caches it depends on are successfully populated.
   */
  event.waitUntil(
    caches.open("static").then(cache => {
      console.log("service worker precaching App Shell");
      // although the file path is used, the 'key' will be the request and
      // 'value' will be the file content; see how we use .match() below
      cache.add("/"); // cache root request
      cache.add("/index.html");
      cache.add("/src/js/app.js");
    })
  );
});

self.addEventListener("activate", function(event) {
  console.log("[Service Worker] Activating Service Worker ....", event);
  return self.clients.claim();
});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) return response; // cache hit, otherwise it's null
      return fetch(event.request);
    })
  );
});
