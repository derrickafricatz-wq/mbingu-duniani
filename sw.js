const CACHE_NAME = "afya-care-v10";

const APP_FILES = [

  // CORE
  "/AFYA-CARE/",
  "/AFYA-CARE/index.html",
  "/AFYA-CARE/manifest.json",
  "/AFYA-CARE/sw.js",

  // DATA FILES
  "/AFYA-CARE/health-data.js",
  "/AFYA-CARE/lesson-data.js",
  "/AFYA-CARE/ads-data.js",
  "/AFYA-CARE/special-ads.js",
  "/AFYA-CARE/hints.js",

  // IMAGES
  "/AFYA-CARE/images/ad3.png",
  "/AFYA-CARE/images/one.jpg",

  // VIDEOS
  "/AFYA-CARE/videos/choo.mp4",
  "/AFYA-CARE/videos/usafi.mp4",
  "/AFYA-CARE/videos/chanjo.mp4",
  "/AFYA-CARE/videos/meno.mp4"

];

self.addEventListener("install", (event) => {

  event.waitUntil(

    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_FILES))

  );

  self.skipWaiting();

});

self.addEventListener("activate", (event) => {

  event.waitUntil(

    caches.keys().then((keys) => {

      return Promise.all(

        keys.map((key) => {

          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }

        })

      );

    })

  );

  self.clients.claim();

});

self.addEventListener("fetch", (event) => {

  event.respondWith(

    caches.match(event.request)
      .then((cached) => {

        return cached || fetch(event.request);

      })

  );

});
