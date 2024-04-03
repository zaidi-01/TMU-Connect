import { ExtWebSocket, WebSocketMessage } from "@interfaces";

/**
 * Handles chat websocket messages.
 * @param client The client.
 * @param message The message.
 */
export function handleMessage(client: ExtWebSocket, message: WebSocketMessage) {
  switch (message.action) {
    default:
      client.sendError(message, "Invalid action");
      break;
  }
}
