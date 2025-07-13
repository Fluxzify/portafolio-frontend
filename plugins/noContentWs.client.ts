export default defineNuxtPlugin(() => {
  // Si el código de Nuxt Content intenta crear la conexión, la anulamos:
  if (window) {
    // Sobrescribir WebSocket para el URL usado por Nuxt Content, evitando conexiones
    const OriginalWebSocket = window.WebSocket;

    window.WebSocket = class FakeWebSocket {
      constructor(url) {
        if (url.includes('/_content/ws') || url.includes('ws://') || url.includes('wss://')) {
          console.warn('[FakeWebSocket] Bloqueando conexión a:', url);
          // No hace nada, no conecta
          return {
            close() {},
            addEventListener() {},
            removeEventListener() {},
            send() {},
            readyState: 3, // CLOSED
            onopen: null,
            onmessage: null,
            onerror: null,
            onclose: null,
          };
        }
        return new OriginalWebSocket(url);
      }
    };
  }
});
