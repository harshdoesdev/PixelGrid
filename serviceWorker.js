const staticDevCoffee = "dev-coffee-site-v1"
const assets = [
  "/",
  "/index.html",
  "/style.css",
  "/app.js",
  "/lib/Application.js",
  "/lib/dom.js",
  "/lib/EventEmitter.js",
  "/lib/Grid.js",
  "/lib/Layer.js",
  "/lib/Stage.js",
  "/lib/utils.js",
  "/systems/TouchHandler.js",
  "/tools/ClearTool.js",
  "/tools/ColorSelector.js",
  "/tools/EraserTool.js",
  "/tools/EyeDropperTool.js",
  "/tools/FillTool.js",
  "/tools/MirrorTool.js",
  "/tools/PencilTool.js",
  "/tools/SaveImage.js",
  "/assets/board.png",
];

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticDevCoffee).then(cache => {
      cache.addAll(assets)
    })
  )
})

self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
      caches.match(fetchEvent.request).then(res => {
        return res || fetch(fetchEvent.request)
      })
    )
})  
