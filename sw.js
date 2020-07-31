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
    caches.open("static-v2").then(cache => {
      console.log("service worker precaching App Shell");
      // although the file path is used, the 'key' will be the request and
      // 'value' will be the file content; see how we use .match() below
      cache.addAll([
        "/", // cache root request
        "/index.html",
        "/src/js/app.js",
        "/src/js/feed.js",
        "/src/js/promise.js", // a better way is to conditionally 'include' polyfill files, since modern browsers who support service worker should also support promise/fetch and do not need these files
        "/src/js/fetch.js",
        "/src/js/material.min.js",
        "/src/css/app.css",
        "/src/css/feed.css",
        "/src/images/main-image.jpg",
        "https://fonts.googleapis.com/css?family=Roboto:400,700",
        "https://fonts.googleapis.com/icon?family=Material+Icons",
        "https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css"
      ]);
    })
  );
});

self.addEventListener("activate", function(event) {
  console.log("[Service Worker] Activating Service Worker ....", event);
  event.waitUntil(
    caches.keys().then(keyList =>
      Promise.all(
        keyList.map(k => {
          if (k !== "static-v2" && k !== "dynamic") {
            console.log("[service worker] removing old cache", k);
            return caches.delete(k);
          }
        })
      )
    )
  );
  return self.clients.claim();
});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) return response; // cache hit, otherwise it's null
      return fetch(event.request).then(res => {
        caches.open("dynamic").then(cache => cache.put(event.request.url, res));
        return res.clone();
      });
      /* 注意两种写法的不同。上边的缓存过程将会在另一个promise中异步执行；这里是要等缓存好了才return res
      return fetch(event.request).then(res =>
        caches.open("dynamic").then(cache => {
          cache.put(event.request.url, res);
          return res.clone();
        })
      );*/
    })
  );
});
