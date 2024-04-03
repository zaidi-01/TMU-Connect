import { ExtWebSocket, WebSocketMessage } from "@interfaces";
import { MessageAction } from "../enums";
import { chatController } from "@controllers";

/**
 * Handles chat websocket messages.
 * @param client The client.
 * @param message The message.
 */
export async function handleMessage(
  client: ExtWebSocket,
  message: WebSocketMessage
) {
  switch (message.action) {
    case MessageAction.SEND_AD_MESSAGE:
      await chatController.sendAdMessage(client, message);
      break;
    default:
      client.sendError(message, "Invalid action");
      break;
  }
}
