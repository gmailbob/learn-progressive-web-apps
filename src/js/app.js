var deferredPrompt;

if('serviceWorker' in navigator){
  navigator.serviceWorker.register('/sw.js')
    .then(()=>{
      console.log('service worker registered.')
    });
}

addEventListener('beforeinstallprompt', event=>{
  console.log('beforeinstallprompt fired');
  event.preventDefault();
  deferredPrompt = event;
  return false;
})