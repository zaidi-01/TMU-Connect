import { IncomingMessage } from "http";
import { Duplex } from "stream";
import { WebSocketServer } from "ws";

/** Websocket server */
const wss = new WebSocketServer({ noServer: true });

/**
 * Handle upgrade to websocket
 * @param request The incoming message
 * @param socket The socket
 * @param head The head
 */
export function handleUpgrade(
  request: IncomingMessage,
  socket: Duplex,
  head: Buffer
) {
  wss.handleUpgrade(request, socket, head, (ws) => {});
}
