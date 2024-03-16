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
export function handleMessage(client: ExtWebSocket, message: string) {
  try {
    const data: WebSocketMessage = JSON.parse(message);
    const handler = messageHandlers[data.action];

    if (!handler) {
      console.error(`No handler for action: ${data.action}`);
      return;
    }

    handler(client, data);
  } catch (error) {
    console.error(error);
    return;
  }
}
