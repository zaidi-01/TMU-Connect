import { MessageType } from "@enums";
import { ExtWebSocket, WebSocketMessage } from "@interfaces";
import { chatHandler } from "./handlers";

/** Message handlers. */
type MessageHandlers = {
  [key in MessageType]: (
    client: ExtWebSocket,
    message: WebSocketMessage
  ) => Promise<void>;
};

const messageHandlers: MessageHandlers = {
  [MessageType.CHAT]: chatHandler.handleMessage,
};

/**
 * Handles incoming message.
 * @param client The client.
 * @param message The message.
 */
export async function handleMessage(client: ExtWebSocket, data: string) {
  try {
    const message: WebSocketMessage = JSON.parse(data);
    const handler = messageHandlers[message.type];

    if (!handler) {
      client.sendError(message, "Invalid type");
      return;
    }

    await handler(client, message);
  } catch (error) {
    console.error(error);
    return;
  }
}
