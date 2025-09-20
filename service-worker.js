const CACHE_NAME = "livro-cache-v15";
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
  "/imgs/icon-512.png",
  "/favicon.ico"
];

// Instala o service worker e faz cache inicial
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("Caching files:", FILES_TO_CACHE);
      return cache.addAll(FILES_TO_CACHE).catch(err => {
        console.error("Erro ao fazer cache:", err);
        throw err;
      });
    })
  );
  self.skipWaiting(); // Força a ativação imediata do novo Service Worker
});

// Ativa e limpa caches antigos
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      console.log("Caches encontrados:", keys);
      return Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)));
    }).catch(err => console.error("Erro ao limpar caches antigos:", err))
  );
  self.clients.claim(); // Assume controle imediato das páginas abertas
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
      return fetch(event.request).then(response => {
        // Cacheia a resposta para requisições futuras
        if (response && response.status === 200 && event.request.method === "GET") {
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, response.clone());
            return response;
          });
        }
        return response;
      }).catch(err => {
        console.error("Erro ao buscar da rede:", err);
        return caches.match("/index.html") || new Response("Offline: recurso não disponível", { status: 503 });
      });
    }).catch(err => {
      console.error("Erro ao processar fetch:", err);
      return caches.match("/index.html") || new Response("Erro ao carregar recurso", { status: 500 });
    })
  );
});