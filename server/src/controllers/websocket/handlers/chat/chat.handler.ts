import { chatController } from "@controllers";
import { WebSocketChatAction as Action } from "@enums";
import { ExtWebSocket, WebSocketMessage } from "@interfaces";

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
    case Action.SEND_AD_MESSAGE:
      await chatController.sendAdMessage(client, message);
      break;
    case Action.ROOM_LIST:
      await chatController.getRooms(client, message);
      break;
    case Action.ROOM_MESSAGE:
      await chatController.sendMessage(client, message);
      break;
    case Action.ROOM_MESSAGE_LIST:
      await chatController.getMessages(client, message);
      break;
    default:
      client.sendError(message, "Invalid action");
      break;
  }
}
