import { webSocketController } from "@controllers";
import { ExtWebSocket } from "@interfaces";
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


/*Chat rooms */
const roomClients = new Map<string, Set<ExtWebSocket>>();

wss.on("connection", (client: ExtWebSocket, userId: number) => {
  client.isAlive = true;
  client.userId = userId;

  joinRoom(client, 'general');

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
 * Sets client as alive
 * @param client The client
 */
function heartbeat(client: ExtWebSocket) {
  client.isAlive = true;
}

/**
 * Handles incoming messages
 * @param client The WebSocket client
 * @param message The incoming message
 */
function handleMessage(client: ExtWebSocket, message: string) {
  const parsedMessage = JSON.parse(message);
  const { action, data } = parsedMessage;

  switch (action) {
    case "joinRoom":
      joinRoom(client, data.room);
      break;
    case "message":
      sendMessageToRoom(client, data.room, data.message);
      break;
    default:
      console.log("Unknown action:", action);
  }
}

/**
 * Joins a room
 * @param client The WebSocket client
 * @param room The name of the room to join
 */
function joinRoom(client: ExtWebSocket, room: string) {
  // Create the room if it doesn't exist
  if (!roomClients.has(room)) {
    roomClients.set(room, new Set());
  }
  // Add the client to the room
  const clients = roomClients.get(room);
  if (clients) {
    clients.forEach((recipient: ExtWebSocket) => {
      recipient.sendMessage({ type: "message",action:"join", data: `${client.userId} has joined the room.` }, () => {});
    });
    clients.add(client);
  } else {
    console.log(`Room '${room}' does not exist.`);
  }
 
}

/**
 * Sends a message to all clients in a room
 * @param client The WebSocket client
 * @param room The name of the room
 * @param message The message to send
 */
function sendMessageToRoom(client: ExtWebSocket, room: string, message: string) {
  const clients = roomClients.get(room);
  if (clients) {
    clients.forEach((recipient: ExtWebSocket) => {
      recipient.sendMessage({ type: "message", action: "send", data: message }, () => {});
    });
  }
}