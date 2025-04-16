let socket = null;
let connected = false;

let heartbeatTimer = null;
let heartbeatCheckTimer = null;
let reconnectTimer = null;

const HEARTBEAT_INTERVAL = 3000;
const HEARTBEAT_TIMEOUT = HEARTBEAT_INTERVAL * 2;
const RECONNECT_DELAY = 3000;

let lastHeartbeatSent = 0;
let lastHeartbeatAck = 0;

// ✅ 分离管理两个集合
const topicsToSubscribe = new Set(); // 所有想订阅的 topic
const sentTopics = new Set(); // 已发送订阅成功的 topic

function connect() {
  socket = new WebSocket('wss://pushserver.mytokenpocket.vip/ws');

  socket.onopen = () => {
    connected = true;
    postMessage({ type: 'connected' });
    console.log('WebSocket connected');

    startHeartbeat();
    startHeartbeatCheck();

    // 💡 连接成功后重新发送所有订阅
    for (const topic of topicsToSubscribe) {
      sendSubscribe(topic);
    }
  };

  socket.onmessage = (event) => {
    let data;
    try {
      data = JSON.parse(event.data);
    } catch (e) {
      return;
    }
    if (data.cmd === 'heartbeat') {
      console.log('Received heartbeat');
      lastHeartbeatAck = Date.now();
    }
    postMessage({ type: 'message', payload: data });
  };

  socket.onerror = () => {
    console.error('WebSocket error');
    socket?.close();
  };

  socket.onclose = () => {
    console.warn('WebSocket closed');
    cleanup();
    reconnect();
  };
}

function cleanup() {
  connected = false;
  stopHeartbeat();
  stopHeartbeatCheck();
  sentTopics.clear(); // 断开后清除已发送的记录，连接后要重新发
  socket = null;
  postMessage({ type: 'disconnected' });
}

function reconnect() {
  if (reconnectTimer) return;
  console.log(`Reconnecting`);
  reconnectTimer = setTimeout(() => {
    reconnectTimer = null;
    connect();
  }, RECONNECT_DELAY);
}

function startHeartbeat() {
  stopHeartbeat();
  heartbeatTimer = setInterval(() => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      const heartbeat = {
        seq: String(Date.now()),
        cmd: 'heartbeat',
      };
      lastHeartbeatSent = Date.now();
      // console.log('Sending heartbeat');
      socket.send(JSON.stringify(heartbeat));
    }
  }, HEARTBEAT_INTERVAL);
}

function stopHeartbeat() {
  if (heartbeatTimer) {
    clearInterval(heartbeatTimer);
    heartbeatTimer = null;
  }
}

function startHeartbeatCheck() {
  stopHeartbeatCheck();
  heartbeatCheckTimer = setInterval(() => {
    const now = Date.now();
    if (
      lastHeartbeatSent &&
      lastHeartbeatAck &&
      now - lastHeartbeatAck > HEARTBEAT_TIMEOUT
    ) {
      console.warn('Heartbeat timeout — closing socket');
      socket?.close(); // 触发 reconnect
    }
  }, HEARTBEAT_INTERVAL); // 每 3 秒检测一次
}

function stopHeartbeatCheck() {
  if (heartbeatCheckTimer) {
    clearInterval(heartbeatCheckTimer);
    heartbeatCheckTimer = null;
  }
}

function sendSubscribe(topic) {
  if (!topic) return;
  topicsToSubscribe.add(topic);
  if (
    connected &&
    socket.readyState === WebSocket.OPEN &&
    !sentTopics.has(topic)
  ) {
    const msg = {
      seq: String(Date.now()),
      cmd: 'subscribe',
      data: { topics: topic },
    };
    socket.send(JSON.stringify(msg));
    sentTopics.add(topic);
    // console.log('Subscribed to:', topic);
  } else {
    console.log('Queued for subscription');
  }
}

function sendUnsubscribe(topic) {
  if (!topic || !topicsToSubscribe.has(topic)) return;
  topicsToSubscribe.delete(topic);
  sentTopics.delete(topic);
  if (connected && socket.readyState === WebSocket.OPEN) {
    const msg = {
      seq: String(Date.now()),
      cmd: 'unsubscribe',
      data: { topics: topic },
    };
    socket.send(JSON.stringify(msg));
  }
}

// 📩 主线程发来的指令处理
onmessage = (e) => {
  const { type, topic } = e.data;
  if (type === 'init') {
    connect();
  }
  if (type === 'subscribe') {
    sendSubscribe(topic);
  }
  if (type === 'unsubscribe') {
    sendUnsubscribe(topic);
  }
};
