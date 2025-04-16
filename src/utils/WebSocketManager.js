// utils/WebSocketManager.js

const worker = new Worker(
  new URL('../workers/socketWorker.js', import.meta.url),
  { type: 'module' }
);

let hasInit = false;
const listeners = new Set();

function init() {
  if (hasInit) return;
  hasInit = true;
  worker.postMessage({ type: 'init' });
}

// worker.postMessage({ type: 'init' });

worker.onmessage = (e) => {
  const { type, payload } = e.data;

  if (type === 'message') {
    listeners.forEach((cb) => cb(payload));
  }

  if (type === 'connected') {
    console.log('[WebSocketManager] connected');
  }

  if (type === 'disconnected') {
    console.warn('[WebSocketManager] disconnected');
  }
};

function subscribe(topic) {
  if (!topic) return;
  worker.postMessage({ type: 'subscribe', topic });
}

function unsubscribe(topic) {
  if (!topic) return;
  worker.postMessage({ type: 'unsubscribe', topic });
}

function onMessage(callback) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}
function destroy(params) {
  if (worker) {
    worker.terminate();
    worker = null;
  }
  listeners.clear();
  console.log('[WebSocketManager] 🧹 Worker destroyed');
}

export default {
  init,
  subscribe,
  unsubscribe,
  onMessage,
};
