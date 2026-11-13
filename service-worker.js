const CACHE_NAME = "henro-shooting-v2";

const urlsToCache = [

    "./",
    "./title.html",
    "./index.html",
    "./goshuin.html",

    "./css/title.css",
    "./css/style.css",
    "./css/goshuin.css"

    "./js/title.js",
    "./js/game.js",
    "./js/modal.js",
    "./js/controls.js",
    "./js/temples.js",
    "./js/save.js",
    "./js/sounds.js",
    "./js/goshuin.js"

    "./sounds/stage.mp3",
    "./sounds/boss.mp3",
    "./sounds/shot.mp3",
    "./sounds/enemyHit.mp3",
    "./sounds/damage.mp3",
    "./sounds/clear.mp3",
    "./sounds/gameover.mp3",
    "./sounds/reset.mp3",
    "./sounds/pause.mp3",
    "./sounds/goshuin.mp3"

    "./images/192-icon.png",
    "./images/512-icon.png",
    "./images/180-icon.png"

];

self.addEventListener("install", event => {

    event.waitUntil(

        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })

    );

});

self.addEventListener("fetch", event => {

    event.respondWith(

        caches.match(event.request)
            .then(response => {

                return response || fetch(event.request);

            })

    );

});
