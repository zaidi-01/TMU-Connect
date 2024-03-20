import { ExtWebSocket, WebSocketMessage } from "@interfaces";

/** Message handlers */
type MessageHandlers = {
  [key: string]: (client: ExtWebSocket, message: WebSocketMessage) => void;
};

// TODO: Add message handlers
const messageHandlers: MessageHandlers = {};

/**
 * Handles incoming message
 * @param client The client
 * @param message The message
 */
export function handleMessage(client: ExtWebSocket, data: string) {
  try {
    const message: WebSocketMessage = JSON.parse(data);
    const handler = messageHandlers[message.action];

    if (!handler) {
      client.sendError(message, "Invalid type");
      return;
    }

    handler(client, message);
  } catch (error) {
    console.error(error);
    return;
  }
}
