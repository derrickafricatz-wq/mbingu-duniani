const CACHE_NAME = "afya-care-v11";

/* ================= CORE FILES ================= */

const APP_FILES = [

  // ROOT
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
  "/AFYA-CARE/images/one.jpg"

];

/* ================= VIDEO FILES ================= */

const VIDEO_FILES = [

  "/AFYA-CARE/videos/choo.mp4",
  "/AFYA-CARE/videos/usafi.mp4",
  "/AFYA-CARE/videos/chanjo.mp4",
  "/AFYA-CARE/videos/meno.mp4"

];

/* ================= INSTALL ================= */

self.addEventListener("install", (event) => {

  event.waitUntil(

    caches.open(CACHE_NAME).then(async (cache) => {

      /* CACHE SMALL FILES */
      await cache.addAll(APP_FILES);

      /* CACHE VIDEOS ONE BY ONE */
      for (const video of VIDEO_FILES) {

        try {

          const response = await fetch(video);

          await cache.put(video, response.clone());

          console.log("Cached video:", video);

        } catch (err) {

          console.log("Failed video:", video);

        }

      }

    })

  );

  self.skipWaiting();

});

/* ================= ACTIVATE ================= */

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

/* ================= FETCH ================= */

self.addEventListener("fetch", (event) => {

  event.respondWith(

    caches.match(event.request).then((cached) => {

      /* RETURN CACHE FIRST */
      if (cached) {

        return cached;

      }

      /* OTHERWISE FETCH FROM INTERNET */
      return fetch(event.request);

    })

  );

});
