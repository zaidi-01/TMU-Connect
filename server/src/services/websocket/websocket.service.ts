import { IncomingMessage } from "http";
import { Duplex } from "stream";
import { WebSocket, WebSocketServer } from "ws";

/** Websocket server */
const wss = new WebSocketServer({ noServer: true });
const clients = new Map<number, WebSocket[]>();

// TODO: Add ping cleanup for dead clients

wss.on("connection", (client: WebSocket, userId: number) => {
  addClient(userId, client);

  client.on("close", () => {
    removeClient(client);
  });
});

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
 * Add a client to the clients map
 * @param userId The user id
 * @param client The client
 */
function addClient(userId: number, client: WebSocket) {
  clients.set(userId, [...(clients.get(userId) || []), client]);
}

/**
 * Remove a client from the clients map
 * @param client The client
 */
function removeClient(client: WebSocket) {
  for (const [userId, userClients] of clients) {
    const index = userClients.indexOf(client);
    if (index !== -1) {
      userClients.splice(index, 1);
      clients.set(userId, userClients);
      return;
    }
  }
}
