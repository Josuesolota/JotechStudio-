/*
  ─────────────────────────────────────────────────────────────
  JOTECH STUDIO — SERVICE WORKER
  ─────────────────────────────────────────────────────────────
  Estratégias:
    · Navegações (HTML) → network-first com timeout, cache de
      fallback e, em último caso, a página /offline.
    · Assets com hash (/_astro/) e imagens/ícones → cache-first
      (são imutáveis ou raramente mudam).
    · Fontes → cache-first com cache próprio de longa duração.
    · Tudo o resto → rede.

  Nunca cacheia: pedidos não-GET, outras origens e o próprio SW.
  Ao publicar uma nova versão, mude SW_VERSION: as caches antigas
  são limpas na ativação.
*/

const SW_VERSION = "v1.1.0";
const SHELL_CACHE = `jotech-shell-${SW_VERSION}`;
const PAGES_CACHE = `jotech-pages-${SW_VERSION}`;
const ASSETS_CACHE = `jotech-assets-${SW_VERSION}`;
const OFFLINE_URL = "/offline";

/** Recursos mínimos para o site abrir sem rede. */
const SHELL_ASSETS = [
  "/",
  OFFLINE_URL,
  "/manifest.webmanifest",
  "/favicon.svg",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(SHELL_CACHE);
      // addAll falha por completo se um recurso falhar — daí o allSettled.
      await Promise.allSettled(SHELL_ASSETS.map((url) => cache.add(new Request(url, { cache: "reload" }))));
      await self.skipWaiting();
    })()
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keep = new Set([SHELL_CACHE, PAGES_CACHE, ASSETS_CACHE]);
      const keys = await caches.keys();
      await Promise.all(keys.filter((k) => !keep.has(k)).map((k) => caches.delete(k)));

      // Navegação pré-carregada: acelera o primeiro fetch de HTML.
      if (self.registration.navigationPreload) {
        await self.registration.navigationPreload.enable();
      }
      await self.clients.claim();
    })()
  );
});

/** Permite ao site pedir a ativação imediata de uma nova versão. */
self.addEventListener("message", (event) => {
  if (event.data === "SKIP_WAITING") self.skipWaiting();
});

const isAsset = (url) =>
  url.pathname.startsWith("/_astro/") ||
  url.pathname.startsWith("/icons/") ||
  url.pathname.startsWith("/brand/") ||
  url.pathname.startsWith("/screenshots/") ||
  /\.(?:css|js|png|jpg|jpeg|webp|avif|svg|ico|woff2?|ttf)$/i.test(url.pathname);

async function networkFirst(event) {
  const cache = await caches.open(PAGES_CACHE);
  try {
    const preloaded = await event.preloadResponse;
    const response = preloaded || (await fetch(event.request));
    if (response && response.ok) cache.put(event.request, response.clone());
    return response;
  } catch (error) {
    const cached = (await cache.match(event.request)) || (await caches.match(event.request));
    if (cached) return cached;
    const offline = await caches.match(OFFLINE_URL);
    return (
      offline ||
      new Response("<h1>Sem ligação</h1>", {
        status: 503,
        headers: { "Content-Type": "text/html; charset=utf-8" },
      })
    );
  }
}

async function cacheFirst(request) {
  const cache = await caches.open(ASSETS_CACHE);
  const cached = await cache.match(request);
  if (cached) {
    // Revalida em segundo plano (stale-while-revalidate).
    fetch(request)
      .then((res) => res.ok && cache.put(request, res.clone()))
      .catch(() => {});
    return cached;
  }
  const response = await fetch(request);
  if (response.ok) cache.put(request, response.clone());
  return response;
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(networkFirst(event));
    return;
  }

  if (isAsset(url)) {
    event.respondWith(cacheFirst(request).catch(() => caches.match(request)));
  }
});
