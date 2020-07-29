self.addEventListener("install", event=>{
  console.log('service worker install event', event);
})

self.addEventListener("activate", event=>{
  console.log('service worker activate event', event);
  return self.clients.claim();
})

self.addEventListener("fetch", event=>{
  console.log('service worker fetch event', event);
  // event.respondWith(null);
})