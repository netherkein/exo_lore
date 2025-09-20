const CACHE_NAME = "livro-cache-v11";
const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/style.css",
  "/script.js",
  "/capitulos.json",
  "/manifest.json",
  "/sounds/botao1.mp3",
  "/sounds/botao2.mp3",
  "/imgs/capa.jpg",
  "/imgs/icon.png",
  "/imgs/icon-512.png"
];

// Instala o service worker e faz cache inicial
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("Caching files:", FILES_TO_CACHE);
      return cache.addAll(FILES_TO_CACHE);
    }).catch(err => console.error("Erro ao fazer cache:", err))
  );
});

// Ativa e limpa caches antigos
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      console.log("Caches encontrados:", keys);
      return Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)));
    })
  );
});

// Intercepta requests e serve do cache
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(resp => {
      if (resp) {
        console.log("Servindo do cache:", event.request.url);
        return resp;
      }
      console.log("Buscando da rede:", event.request.url);
      return fetch(event.request);
    }).catch(err => console.error("Erro ao buscar:", err))
  );
});