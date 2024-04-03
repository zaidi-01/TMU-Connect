import { webSocketController } from "@controllers";
import { ExtWebSocket, WebSocketMessage } from "@interfaces";
import { IncomingMessage } from "http";
import { Duplex } from "stream";
import { WebSocket, WebSocketServer } from "ws";

/** Websocket server */
const wss = new WebSocketServer({ noServer: true });

/** Dead client interval */
const cleanupInterval = setInterval(() => {
  wss.clients.forEach((client: WebSocket) => {
    const extClient = client as ExtWebSocket;

    if (extClient.isAlive === false) {
      extClient.terminate();
    }

    extClient.isAlive = false;
    extClient.ping();
  });
}, 30 * 1000);

wss.on("connection", (client: ExtWebSocket, userId: number) => {
  client.isAlive = true;
  client.userId = userId;
  client.sendMessage = (message, cb) =>
    client.send(JSON.stringify(message), cb);
  client.sendError = (message, error, cb) =>
    client.sendMessage(
      { type: message.type, action: "error", data: error },
      cb
    );

  client.on("error", console.error);
  client.on("message", webSocketController.handleMessage.bind(null, client));
  client.on("pong", heartbeat.bind(null, client));
});

wss.on("close", clearInterval.bind(null, cleanupInterval));

/**
 * Handle upgrade to websocket
 * @param request The incoming message
 * @param socket The socket
 * @param head The head
 */
export function handleUpgrade(
  request: IncomingMessage,
  socket: Duplex,
  head: Buffer,
  userId: number
) {
  wss.handleUpgrade(request, socket, head, (client: WebSocket) => {
    wss.emit("connection", client, userId);
  });
}

/**
 * Sends a message to a user.
 * @param userId The user ID.
 * @param message The message.
 */
export function sendMessageToUser<T>(userId: number, message: WebSocketMessage<T>) {
  wss.clients.forEach((client: WebSocket) => {
    const extClient = client as ExtWebSocket;

    if (extClient.userId === userId) {
      extClient.sendMessage(message);
    }
  });
}

/**
 * Sets client as alive
 * @param client The client
 */
function heartbeat(client: ExtWebSocket) {
  client.isAlive = true;
}
